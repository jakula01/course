export default function UserRow({ user, isSelected, onSelect, t }) {
  return (
    <tr className={user.status === "blocked" ? "text-muted" : ""}>
      <td>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(user.id)}
        />
      </td>
      <td>
        <div
          className={
            user.status === "blocked" ? "text-decoration-line-through" : ""
          }
        >
          {user.username}
        </div>
        <small className="text-muted">
          {user.company === "" ? "N/A" : user.company}
        </small>
      </td>
      <td className={user.status === "blocked" ? "text-muted" : ""}>
        {user.email}
      </td>
      <td>{new Date(user.created_at).toLocaleString()}</td>
    </tr>
  );
}
