import React, { useState, useEffect, useRef } from "react";
import Toolbar from "../components/Toolbar";
import UserRow from "../components/UserRow";
import { useTranslation } from "react-i18next";
import { useAuth } from "../auth/useAuth";
import {
  getUsers,
  updateUserStatus,
  deleteUsersByIds,
} from "../api/UsersService";

export default function UserTable() {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const selectAllRef = useRef();

  const [sortOrder, setSortOrder] = useState("desc");
  const { userData } = useAuth();

  const filteredUsers = users
    .slice()

    .filter(
      (u) =>
        u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };
  const allFilteredSelected =
    filteredUsers.length > 0 &&
    filteredUsers.every((u) => selectedIds.includes(u.id));

  const someSelected =
    filteredUsers.some((u) => selectedIds.includes(u.id)) &&
    !allFilteredSelected;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response);
      } catch (err) {
        console.error("Error on loading users:", err);
      }
    };

    fetchUsers();
  }, []);
  const updateStatus = async (status) => {
    try {
      await updateUserStatus(selectedIds, status);
      setUsers((prev) =>
        prev.map((user) =>
          selectedIds.includes(user.id) ? { ...user, status } : user
        )
      );
      setSelectedIds([]);
    } catch (err) {
      console.error(err);
    }
  };
  const deleteUsers = async () => {
    try {
      await deleteUsersByIds(selectedIds);
      setUsers((prev) => prev.filter((user) => !selectedIds.includes(user.id)));
      setSelectedIds([]);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate = someSelected;
    }
  }, [someSelected, allFilteredSelected]);

  const toggleSelectAll = () => {
    if (allFilteredSelected || selectedIds.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredUsers.map((u) => u.id));
    }
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="container py-4">
      <Toolbar
        selectedCount={selectedIds.length}
        onBlock={() => updateStatus("blocked")}
        onUnblock={() => updateStatus("active")}
        onDelete={deleteUsers}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        t={t}
      />

      <table className="table table-hover">
        <thead className="table-light">
          <tr>
            <th>
              <input
                type="checkbox"
                ref={selectAllRef}
                onChange={toggleSelectAll}
                checked={allFilteredSelected}
              />
            </th>
            <th>{t("username")}</th>
            <th>{t("email")}</th>
            <th onClick={toggleSortOrder} style={{ cursor: "pointer" }}>
              {t("createdAt")}{" "}
              {sortOrder === "asc" ? <span>&uarr;</span> : <span>&darr;</span>}
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <UserRow
              key={user.id}
              user={user}
              isSelected={selectedIds.includes(user.id)}
              onSelect={toggleSelect}
              t={t}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
