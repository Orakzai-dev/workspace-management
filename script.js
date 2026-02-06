// Utility: Generate unique ID
function generateId(prefix = "id") {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

// Utility: Get data from LocalStorage
function getData(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

// Utility: Save data to LocalStorage
function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Add or Update Team
function saveTeam(e) {
  e.preventDefault();
  const id = document.getElementById("team-id").value || generateId("team");
  const name = document.getElementById("team-name").value.trim();
  const desc = document.getElementById("team-desc").value.trim();

  if (!name || !desc) return;

  let teams = getData("teams");
  const existingIndex = teams.findIndex((t) => t.id === id);

  const teamObj = { id, name, description: desc };

  if (existingIndex >= 0) {
    teams[existingIndex] = teamObj;
  } else {
    teams.push(teamObj);
  }

  saveData("teams", teams);
  document.getElementById("team-form").reset();
  renderTeams();
  populateTeamDropdown();
  updateTeamSummary();
}

// Delete Team
function deleteTeam(id) {
  let teams = getData("teams");
  teams = teams.filter((t) => t.id !== id);
  saveData("teams", teams);

  // Also remove members assigned to this team
  let members = getData("members");
  members = members.filter((m) => m.teamId !== id);
  saveData("members", members);

  renderTeams();
  renderMembers();
  populateTeamDropdown();
  updateTeamSummary();
}

// Edit Team (populate form)
function editTeam(id) {
  const team = getData("teams").find((t) => t.id === id);
  if (team) {
    document.getElementById("team-id").value = team.id;
    document.getElementById("team-name").value = team.name;
    document.getElementById("team-desc").value = team.description;
  }
}

// Render Teams Table
function renderTeams() {
  const teams = getData("teams");
  const tbody = document.querySelector("#team-table tbody");
  const emptyMsg = document.getElementById("team-empty");
  tbody.innerHTML = "";

  if (!teams || teams.length === 0) {
    emptyMsg.style.display = "block";
    document.getElementById("team-table").style.display = "none";
    return;
  }

  emptyMsg.style.display = "none";
  document.getElementById("team-table").style.display = "table";

  teams.forEach((team) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${team.name}</td>
        <td>${team.description}</td>
        <td>
          <button class="edit" onclick="editTeam('${team.id}')">Edit</button>
          <button class="delete" onclick="deleteTeam('${team.id}')">Delete</button>
        </td>
      `;
    tbody.appendChild(row);
  });
}

// Populate Team Dropdown for Member Assignment
function populateTeamDropdown() {
  const teams = getData("teams");
  const select = document.getElementById("member-team");
  if (!select) return;

  select.innerHTML = '<option value="">Select a team</option>';
  teams.forEach((team) => {
    const option = document.createElement("option");
    option.value = team.id;
    option.textContent = team.name;
    select.appendChild(option);
  });
}

// Update Team Summary Table
function updateTeamSummary() {
  const teams = getData("teams");
  const members = getData("members");
  const tbody = document.querySelector("#summary-table tbody");
  const emptyMsg = document.getElementById("summary-empty");
  tbody.innerHTML = "";

  if (!teams || teams.length === 0) {
    emptyMsg.style.display = "block";
    document.getElementById("summary-table").style.display = "none";
    return;
  }

  emptyMsg.style.display = "none";
  document.getElementById("summary-table").style.display = "table";


  teams.forEach((team) => {
    const count = members.filter((m) => m.teamId === team.id).length;
    const row = document.createElement("tr");
    row.innerHTML = `<td>${team.name}</td><td>${count}</td>`;
    tbody.appendChild(row);
  });
}

// Add or Update Member
function saveMember(e) {
  e.preventDefault();
  const id = document.getElementById("member-id").value || generateId("member");
  const name = document.getElementById("member-name").value.trim();
  const email = document.getElementById("member-email").value.trim();
  const role = document.getElementById("member-role").value.trim();
  const teamId = document.getElementById("member-team").value;

  if (!name || !email || !role || !teamId) return;

  let members = getData("members");
  const existingIndex = members.findIndex((m) => m.id === id);

  const memberObj = { id, name, email, role, teamId, status: "Available" };

  if (existingIndex >= 0) {
    members[existingIndex] = memberObj;
  } else {
    members.push(memberObj);
  }

  saveData("members", members);
  document.getElementById("member-form").reset();
  renderMembers();
  updateTeamSummary();
}

// Delete Member
function deleteMember(id) {
  let members = getData("members");
  members = members.filter((m) => m.id !== id);
  saveData("members", members);
  renderMembers();
  updateTeamSummary();
}

// Edit Member (populate form)
function editMember(id) {
  const member = getData("members").find((m) => m.id === id);
  if (member) {
    document.getElementById("member-id").value = member.id;
    document.getElementById("member-name").value = member.name;
    document.getElementById("member-email").value = member.email;
    document.getElementById("member-role").value = member.role;
    document.getElementById("member-team").value = member.teamId;
  }
}

// Render Members Table
function renderMembers() {
  const members = getData("members");
  const tbody = document.querySelector("#member-table tbody");
  const emptyMsg = document.getElementById("member-empty");
  tbody.innerHTML = "";

  if (!members || members.length === 0) {
    emptyMsg.style.display = "block";
    document.getElementById("member-table").style.display = "none";
    return;
  }

  emptyMsg.style.display = "none";
  document.getElementById("member-table").style.display = "table";

  members.forEach(member => {
    const team = getData("teams").find(t => t.id === member.teamId);
    const teamName = team ? team.name : "Unassigned";
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${member.name}</td>
      <td>${member.email}</td>
      <td>${member.role}</td>
      <td>${teamName}</td>
      <td>
        <button class="edit" onclick="editMember('${member.id}')">Edit</button>
        <button class="delete" onclick="deleteMember('${member.id}')">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// Render Team List
function renderTeamList() {
  const teams = getData("teams");
  const ul = document.getElementById("teams-ul");
  ul.innerHTML = "";

  teams.forEach((team) => {
    const li = document.createElement("li");
    li.textContent = team.name;
    li.onclick = () => showTeamDetails(team.id);
    ul.appendChild(li);
  });
}

// Show Team Details
function showTeamDetails(teamId) {
  const team = getData("teams").find((t) => t.id === teamId);
  const members = getData("members").filter((m) => m.teamId === teamId);

  document.getElementById("team-title").textContent = team.name;
  document.getElementById("team-desc").textContent = team.description;

  const tbody = document.querySelector("#team-members-table tbody");
  tbody.innerHTML = "";

  members.forEach((member) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${member.name}</td>
        <td>${member.email}</td>
        <td>${member.role}</td>
        <td>
          <select class="status-dropdown" onchange="updateMemberStatus('${
            member.id
          }', this.value)">
            <option value="Available" ${
              member.status === "Available" ? "selected" : ""
            }>Available</option>
            <option value="Busy" ${
              member.status === "Busy" ? "selected" : ""
            }>Busy</option>
            <option value="On Leave" ${
              member.status === "On Leave" ? "selected" : ""
            }>On Leave</option>
          </select>
        </td>
      `;
    tbody.appendChild(row);
  });

  document.getElementById("team-details").style.display = "block";
}

// Update Member Status
function updateMemberStatus(id, newStatus) {
  let members = getData("members");
  const index = members.findIndex((m) => m.id === id);
  if (index >= 0) {
    members[index].status = newStatus;
    saveData("members", members);
  }
}

function exportToCSV() {
  const teams = getData("teams");
  const members = getData("members");

  let csv = "Team Name,Team Description,Member Name,Email,Role,Status\n";

  teams.forEach((team) => {
    const teamMembers = members.filter((m) => m.teamId === team.id);
    teamMembers.forEach((member) => {
      csv += `"${team.name}","${team.description}","${member.name}","${member.email}","${member.role}","${member.status}"\n`;
    });
  });

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "team_data.csv";
  link.click();
}

function filterMembers() {
  const query = document.getElementById("member-search").value.toLowerCase();
  const members = getData("members");
  const teams = getData("teams");
  const tbody = document.querySelector("#member-table tbody");
  tbody.innerHTML = "";

  members
    .filter(
      (m) =>
        m.name.toLowerCase().includes(query) ||
        m.role.toLowerCase().includes(query)
    )
    .forEach((member) => {
      const team = teams.find((t) => t.id === member.teamId);
      const teamName = team ? team.name : "—";

      const row = document.createElement("tr");
      row.innerHTML = `
          <td>${member.name}</td>
          <td>${member.email}</td>
          <td>${member.role}</td>
          <td>${teamName}</td>
          <td>
            <button class="edit" onclick="editMember('${member.id}')">Edit</button>
            <button class="delete" onclick="deleteMember('${member.id}')">Delete</button>
          </td>
        `;
      tbody.appendChild(row);
    });
}

function toggleTheme() {
  const isDark = document.getElementById("theme-toggle").checked;
  document.body.classList.toggle("dark-mode", isDark);
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

function applySavedTheme() {
  const saved = localStorage.getItem("theme");
  const isDark = saved === "dark";
  document.body.classList.toggle("dark-mode", isDark);

  const toggle = document.getElementById("theme-toggle");
  if (toggle) toggle.checked = isDark;
}

// Init
document.addEventListener("DOMContentLoaded", () => {
  // Header
  fetch("components/header.html")
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("header-placeholder").innerHTML = html;
      applySavedTheme();
      document
        .getElementById("theme-toggle")
        .addEventListener("change", toggleTheme);
    });

  // Admin Page
  if (document.getElementById("team-table")) {
    renderTeams();
    renderMembers();
    populateTeamDropdown();
    updateTeamSummary();

    const teamForm = document.getElementById("team-form");
    if (teamForm) teamForm.addEventListener("submit", saveTeam);

    const memberForm = document.getElementById("member-form");
    if (memberForm) memberForm.addEventListener("submit", saveMember);

    const searchInput = document.getElementById("member-search");
    if (searchInput) {
      searchInput.addEventListener("input", filterMembers);
    }
  }

  // Team Page
  if (document.getElementById("teams-ul")) {
    renderTeamList();
  }

  // Theme toggle (shared across pages)
  applySavedTheme();
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("change", toggleTheme);
  }
});
