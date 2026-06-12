import { test, expect } from '@playwright/test';

test.describe('Tier 3: Cross-Feature Combinations', () => {
  // E2E_T3_COMB_01: Unauthorized access protection
  test('E2E_T3_COMB_01: Unauthorized access protection and redirection', async ({ page }) => {
    // Navigate directly to dashboard without a session
    await page.goto('/dashboard');
    // Expect redirect to signin page
    await expect(page).toHaveURL(/\/signin/);
    
    // Fill credentials
    await page.fill('#email', 'executive@boardroom.com');
    await page.fill('#password', 'password123');
    await page.click('button:has-text("ENTER BOARDROOM")');
    
    // Expect redirect back to dashboard
    await expect(page).toHaveURL(/\/dashboard/);
  });

  // E2E_T3_COMB_02: Ingestion updates reports and dashboard count
  test('E2E_T3_COMB_02: Ingestion updates reports and dashboard count', async ({ page }) => {
    // Setup session by logging in
    await page.goto('/signin');
    await page.fill('#email', 'executive@boardroom.com');
    await page.fill('#password', 'password123');
    await page.click('button:has-text("ENTER BOARDROOM")');
    await expect(page).toHaveURL(/\/dashboard/);

    // Go to reports page
    await page.click('a:has-text("Reports")');
    await expect(page).toHaveURL(/\/reports/);

    // Initial count of reports listed
    const initialReportCount = await page.locator('.report-item').count();

    // Upload a new document
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles({
      name: 'nimbus_pitch.pdf',
      mimeType: 'application/pdf',
      buffer: Buffer.from('mock pdf content')
    });
    await page.click('button:has-text("Upload")');

    // Wait for the report list to update
    await expect(page.locator('.report-item')).toHaveCount(initialReportCount + 1);

    // Go back to dashboard and verify the reports count widget updates
    await page.click('a:has-text("Context")'); // In dashboard.html, active dashboard link is "Context"
    await expect(page).toHaveURL(/\/dashboard/);
    
    // Verify report counter widget shows correct count
    const countText = await page.locator('#reports-count-widget').textContent();
    expect(Number(countText)).toBe(initialReportCount + 1);
  });

  // E2E_T3_COMB_03: Settings adjustment modifies debate behavior
  test('E2E_T3_COMB_03: Settings adjustment modifies debate behavior', async ({ page }) => {
    // Log in
    await page.goto('/signin');
    await page.fill('#email', 'executive@boardroom.com');
    await page.fill('#password', 'password123');
    await page.click('button:has-text("ENTER BOARDROOM")');
    
    // Go to settings page
    await page.click('a:has-text("Settings")');
    await expect(page).toHaveURL(/\/settings/);

    // Adjust Risk Tolerance slider to Conservative (10%)
    const riskSlider = page.locator('input[type="range"]').first();
    await riskSlider.fill('10');
    await page.click('button:has-text("Commit Protocol Changes")');

    // Navigate to board meeting details
    await page.click('a:has-text("Meetings")');
    await page.click('.meeting-item:has-text("Project Nimbus")');
    
    // Ask a question to trigger debate
    await page.fill('input[placeholder="ASK THE BOARD..."]', 'Should we launch in Germany immediately?');
    await page.click('button:has-text("send")');

    // Verify debate transcript has cautious responses
    const firstBubble = page.locator('.brutal-border').first();
    await expect(firstBubble).toBeVisible();
    const transcript = await page.locator('body').textContent();
    expect(transcript).toMatch(/(caution|risk|mitigate|phase|evaluate|defer|conservative)/i);
  });

  // E2E_T3_COMB_04: Board ratification creates dashboard decision log
  test('E2E_T3_COMB_04: Board ratification creates dashboard decision log', async ({ page }) => {
    // Log in
    await page.goto('/signin');
    await page.fill('#email', 'executive@boardroom.com');
    await page.fill('#password', 'password123');
    await page.click('button:has-text("ENTER BOARDROOM")');
    
    // Go to meeting details page
    await page.goto('/meetings/nimbus-meeting-1');

    // Click Ratify button on the recommendation panel
    await page.click('button:has-text("Ratify")');

    // Go back to dashboard
    await page.click('a:has-text("Context")');
    await expect(page).toHaveURL(/\/dashboard/);

    // Verify ratified decision is in the Recent Decisions column
    const decisionsSection = page.locator('section:has-text("Decisions")');
    await expect(decisionsSection).toContainText('PROCEED WITH CAUTION');
  });

  // E2E_T3_COMB_05: Sign-up populates default team & settings
  test('E2E_T3_COMB_05: Sign-up populates default team & settings', async ({ page }) => {
    // Go to sign-up page
    await page.goto('/signup');
    
    // Fill sign-up form
    await page.fill('#email', 'newfounder@nimbus.com');
    await page.fill('#password', 'password123');
    await page.fill('#org-name', 'Nimbus Labs');
    await page.click('button:has-text("CREATE ACCOUNT")');

    // Redirect to dashboard
    await expect(page).toHaveURL(/\/dashboard/);
    await expect(page.locator('h1')).toContainText('WELCOME, FOUNDER');

    // Go to team page and check team count is 10
    await page.click('a:has-text("Team")');
    await expect(page).toHaveURL(/\/team/);
    await expect(page.locator('.team-card')).toHaveCount(10);

    // Go to settings page and check default Risk Tolerance is 65%
    await page.click('a:has-text("Settings")');
    await expect(page).toHaveURL(/\/settings/);
    const riskSlider = page.locator('input[type="range"]').first();
    await expect(riskSlider).toHaveValue('65');
  });
});
