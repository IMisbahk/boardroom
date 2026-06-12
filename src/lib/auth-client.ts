export function setSessionCookie() {
  document.cookie = "boardroom_session=1; Path=/; Max-Age=2592000; SameSite=Lax";
}

export function clearSessionCookie() {
  document.cookie = "boardroom_session=; Path=/; Max-Age=0; SameSite=Lax";
}
