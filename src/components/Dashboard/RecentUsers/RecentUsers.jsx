import "./RecentUsers.css";

const users = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    status: "Active",
  },
  {
    id: 2,
    name: "Pavan Kumar",
    email: "pavan@gmail.com",
    status: "Active",
  },
  {
    id: 3,
    name: "Sneha Reddy",
    email: "sneha@gmail.com",
    status: "Pending",
  },
  {
    id: 4,
    name: "John Peter",
    email: "john@gmail.com",
    status: "Blocked",
  },
];

function RecentUsers() {
  return (
    <div className="recent-users glass">
      <div className="section-header">
        <h3>Recent Users</h3>
        <button>View All</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>

            <th>Email</th>

            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>

              <td>{user.email}</td>

              <td>
                <span className={`status ${user.status.toLowerCase()}`}>
                  {user.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecentUsers;
