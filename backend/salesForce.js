const axios = require("axios");
const qs = require("qs");

let accessToken = null;
let instanceUrl = null;

const login = async () => {
  const url = "https://login.salesforce.com/services/oauth2/token";
  const response = await axios.post(
    url,
    qs.stringify({
      grant_type: "password",
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      username: process.env.SF_USERNAME,
      password: process.env.SF_PASSWORD,
    }),
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
  );

  accessToken = response.data.access_token;
  instanceUrl = response.data.instance_url;
};

const getAuthHeader = async () => {
  if (!accessToken) await login();
  return {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };
};

const upsertContact = async ({ name, email, phone, company }) => {
  const headers = await getAuthHeader();

  const accountQuery = await axios.get(
    `${instanceUrl}/services/data/v59.0/query?q=` +
      `SELECT Id FROM Account WHERE Name = '${company}' LIMIT 1`,
    { headers }
  );

  let accountId;

  if (accountQuery.data.records.length > 0) {
    accountId = accountQuery.data.records[0].Id;
  } else {
    const accountRes = await axios.post(
      `${instanceUrl}/services/data/v59.0/sobjects/Account`,
      { Name: company },
      { headers }
    );
    accountId = accountRes.data.id;
  }

  const existingContact = await getContactByEmail(email);

  let contactRes;

  if (existingContact) {
    contactRes = await axios.patch(
      `${instanceUrl}/services/data/v59.0/sobjects/Contact/${existingContact.Id}`,
      {
        LastName: name,
        Email: email,
        Phone: phone,
        AccountId: accountId,
      },
      { headers }
    );
  } else {
    contactRes = await axios.post(
      `${instanceUrl}/services/data/v59.0/sobjects/Contact`,
      {
        LastName: name,
        Email: email,
        Phone: phone,
        AccountId: accountId,
      },
      { headers }
    );
  }

  return { contactId: contactRes.data.id, accountId };
};

const getContactByEmail = async (email) => {
  const headers = await getAuthHeader();

  const response = await axios.get(
    `${instanceUrl}/services/data/v59.0/query?q=` +
      `SELECT Id, LastName, Email, Phone, Account.Name FROM Contact WHERE Email = '${email}'`,
    { headers }
  );

  return response.data.records[0] || null;
};

module.exports = { upsertContact, getContactByEmail };
