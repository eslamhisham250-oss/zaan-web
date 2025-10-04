import { useEffect, useState } from "react";

export default function Navbar() {
  const [notifs, setNotifs] = useState([]);

  useEffect(() => {
    async function fetchNotifs() {
      const res = await fetch("/api/notifications?userId=admin");
      const data = await res.json();
      if (data.success) setNotifs(data.notifications);
    }
    fetchNotifs();
  }, []);

  return (
    <nav style={{ padding: 12, background: "#eee", display: "flex", justifyContent: "space-between" }}>
      <span>🏠 ZAAN</span>
      <div>
        🔔 {notifs.filter((n) => !n.read).length}
      </div>
    </nav>
  );
}
