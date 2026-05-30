const form = document.getElementById("searchForm");
const input = document.getElementById("usernameInput");
const feedback = document.getElementById("feedback");
const searchButton = document.getElementById("searchButton");
const profileCard = document.getElementById("profileCard");
const apiBaseUrl =
  window.location.protocol === "file:" ? process.env.API_BASE_URL : "";

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatDate(value) {
  if (!value) {
    return "N/A";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "N/A";
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

function profileCardTemplate(profile) {
  const avatarUrl = profile.avatarUrl || profile.avatar_url || "";
  const fullName = profile.name || profile.fullName || "N/A";
  const username = profile.username || profile.login || "N/A";
  const bio = profile.bio || "No bio available.";
  const followers = profile.followers ?? "N/A";
  const following = profile.following ?? "N/A";
  const publicRepos = profile.publicRepos ?? profile.public_repos ?? "N/A";
  const email = profile.email || profile.emailAddress || "";
  const createdAt = profile.createdAt || "N/A";
  const profileUrl = profile.profileUrl || "N/A";
  const score = profile.Score ?? profile.score ?? "";
  function scoreClass(val) {
    const n = Number(val);
    if (Number.isNaN(n)) return "score-badge";
    if (n < 3) return "score-badge score-badge--low";
    if (n < 7) return "score-badge score-badge--medium";
    return "score-badge score-badge--high";
  }
  function formatScore(val) {
    const n = Number(val);
    if (Number.isNaN(n)) return String(val);
    return Number.isInteger(n) ? String(n) : n.toFixed(1);
  }
  return `
    <article class="profile-card__content">
      <h2 class="profile-card__title">Profile Details</h2>
      <div class="profile-card__header">
        <img class="profile-card__avatar" src="${escapeHtml(avatarUrl)}" alt="${escapeHtml(fullName)} avatar" />
        <div class="profile-card__name-block">
          <h3 class="profile-card__name">${escapeHtml(fullName)}</h3>
          <p class="profile-card__username">@${escapeHtml(username)}</p>
        </div>
      </div>

      <p class="profile-card__bio">${escapeHtml(bio)}</p>

      <div class="profile-card__stats" aria-label="GitHub profile statistics">
        <div class="stat">
          <span class="stat__label">Followers</span>
          <span class="stat__value">${escapeHtml(followers)}</span>
        </div>
        <div class="stat">
          <span class="stat__label">Following</span>
          <span class="stat__value">${escapeHtml(following)}</span>
        </div>
        <div class="stat">
          <span class="stat__label">Public Repositories</span>
          <span class="stat__value">${escapeHtml(publicRepos)}</span>
        </div>
        ${
          email
            ? `
          <div class="stat">
            <span class="stat__label">Email</span>
            <span class="stat__value">${escapeHtml(email)}</span>
          </div>
        `
            : ""
        }
      </div>

      <div class="profile-card__meta">
        <div class="meta-row">
          <span class="meta-row__label">Account Created</span>
          <span class="meta-row__value">${escapeHtml(formatDate(createdAt))}</span>
        </div>
        ${
          score !== ""
            ? `
          <div class="meta-row meta-row--score">
            <span class="meta-row__label">Model Score</span>
            <span class="meta-row__value"><span class="${scoreClass(score)}">${escapeHtml(formatScore(score))}</span></span>
          </div>
        `
            : ""
        }
      </div>

      <div class="profile-card__actions">
        <a class="profile-card__button" href="${escapeHtml(profileUrl)}" target="_blank" rel="noreferrer noopener">Visit Profile</a>
      </div>
    </article>
  `;
}

function setEmptyState() {
  profileCard.className = "profile-card profile-card--empty";
  profileCard.innerHTML = `
    <h2 id="result-title" class="profile-card__title">Profile Details</h2>
    <p class="profile-card__placeholder">Search for a GitHub profile to see details.</p>
  `;
}

function setLoadingState() {
  profileCard.className = "profile-card profile-card--loading";
  profileCard.innerHTML = `
    <h2 id="result-title" class="profile-card__title">Profile Details</h2>
    <p class="profile-card__message">Loading profile data...</p>
  `;
}

function setErrorState(message) {
  profileCard.className = "profile-card profile-card--error";
  profileCard.innerHTML = `
    <h2 id="result-title" class="profile-card__title">Profile Details</h2>
    <p class="profile-card__message profile-card__message--error">${escapeHtml(message)}</p>
  `;
}

function setSuccessState(profile) {
  profileCard.className = "profile-card";
  profileCard.innerHTML = profileCardTemplate(profile);
}

async function fetchProfile(username) {
  const response = await fetch(
    `${apiBaseUrl}/api/profile/${encodeURIComponent(username)}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    },
  );

  let payload = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    const message =
      payload?.message ||
      "Profile not found. Please check the username and try again.";
    throw new Error(message);
  }

  return payload;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const username = input.value.trim();
  if (!username) {
    feedback.textContent = "Please enter a GitHub username.";
    feedback.className = "feedback profile-card__message--error";
    setEmptyState();
    return;
  }

  feedback.textContent = "";
  feedback.className = "feedback";
  searchButton.disabled = true;
  input.disabled = true;
  setLoadingState();

  try {
    const profile = await fetchProfile(username);
    setSuccessState(profile);
    feedback.textContent = `Showing profile for ${username}.`;
    feedback.className = "feedback profile-card__message--success";
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Something went wrong while fetching the profile.";
    setErrorState(message);
    feedback.textContent = message;
    feedback.className = "feedback profile-card__message--error";
  } finally {
    searchButton.disabled = false;
    input.disabled = false;
    input.focus();
  }
});

input.addEventListener("input", () => {
  if (!input.value.trim()) {
    feedback.textContent = "";
    feedback.className = "feedback";
    setEmptyState();
  }
});

setEmptyState();
