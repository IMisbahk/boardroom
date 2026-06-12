import { test, expect } from '@playwright/test';

test.describe('Feature 1: Landing Page (LAND)', () => {
  test('E2E_T1_LAND_01: Verify landing page loads successfully with page title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle('Boardroom - Your AI Executive Team');
  });

  test('E2E_T1_LAND_02: Verify top navigation bar links exist and are visible', async ({ page }) => {
    await page.goto('/');
    const nav = page.locator('nav');
    await expect(nav.getByRole('link', { name: 'Platform' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Governance' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Insights' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Case Studies' })).toBeVisible();
  });

  test('E2E_T1_LAND_03: Verify landing page CTA button "Assemble Your Board" is present', async ({ page }) => {
    await page.goto('/');
    const ctaButton = page.locator('button.neo-btn', { hasText: 'Assemble Your Board' });
    await expect(ctaButton).toBeVisible();
  });

  test('E2E_T1_LAND_04: Verify landing page CTA button "Start a Meeting" is visible in nav', async ({ page }) => {
    await page.goto('/');
    const startMeetingButton = page.locator('nav button', { hasText: 'Start a Meeting' });
    await expect(startMeetingButton).toBeVisible();
  });

  test('E2E_T1_LAND_05: Verify the AI Principals bento grid section loads', async ({ page }) => {
    await page.goto('/');
    const grid = page.locator('.grid');
    await expect(grid.locator('.neo-card', { hasText: 'The Architect' })).toBeVisible();
    await expect(grid.locator('.neo-card', { hasText: 'The Catalyst' })).toBeVisible();
    await expect(grid.locator('.neo-card', { hasText: 'The Auditor' })).toBeVisible();
  });
});

test.describe('Feature 2: Sign-in / Auth (AUTH)', () => {
  test('E2E_T1_AUTH_01: Verify Sign-in page heading and inputs', async ({ page }) => {
    await page.goto('/signin');
    await expect(page.locator('h1')).toContainText('IDENTITY');
    await expect(page.locator('h1')).toContainText('VERIFICATION');
    await expect(page.locator('input#email')).toBeVisible();
    await expect(page.locator('input#password')).toBeVisible();
  });

  test('E2E_T1_AUTH_02: Verify successful login redirects to dashboard', async ({ page }) => {
    await page.goto('/signin');
    await page.fill('input#email', 'executive@boardroom.com');
    await page.fill('input#password', 'password123');
    await page.click('button[type="submit"]:has-text("ENTER BOARDROOM")');
    await expect(page).toHaveURL(/\/dashboard/);
  });

  test('E2E_T1_AUTH_03: Verify logout button on Account panel redirects to sign-in', async ({ page }) => {
    await page.goto('/settings');
    const signOutBtn = page.locator('button', { hasText: 'Sign Out' });
    await expect(signOutBtn).toBeVisible();
    await signOutBtn.click();
    await expect(page).toHaveURL(/\/signin/);
  });

  test('E2E_T1_AUTH_04: Verify signed-in session persists across reloads', async ({ page }) => {
    await page.goto('/signin');
    await page.fill('input#email', 'executive@boardroom.com');
    await page.fill('input#password', 'password123');
    await page.click('button[type="submit"]:has-text("ENTER BOARDROOM")');
    await expect(page).toHaveURL(/\/dashboard/);
    
    await page.reload();
    await expect(page.locator('h1')).toContainText('WELCOME, FOUNDER');
  });

  test('E2E_T1_AUTH_05: Verify presence of SSO and Request Access links', async ({ page }) => {
    await page.goto('/signin');
    await expect(page.locator('a', { hasText: 'Single Sign-On' })).toBeVisible();
    await expect(page.locator('a', { hasText: 'Request Access' })).toBeVisible();
  });
});

test.describe('Feature 3: Dashboard (DASH)', () => {
  test('E2E_T1_DASH_01: Verify dashboard displays welcome message', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page.locator('h1')).toContainText('WELCOME, FOUNDER');
  });

  test('E2E_T1_DASH_02: Verify dashboard displays status as NOMINAL', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page.locator('text=SYSTEM STATUS: NOMINAL')).toBeVisible();
  });

  test('E2E_T1_DASH_03: Verify primary directive panel recommendation', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page.locator('text=THE BOARD RECOMMENDS PRIORITIZING RETENTION OVER GROWTH THIS QUARTER.')).toBeVisible();
  });

  test('E2E_T1_DASH_04: Verify presence of discussions, insights, and decisions columns', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page.locator('h3', { hasText: 'Discussions' })).toBeVisible();
    await expect(page.locator('h4', { hasText: 'Seed Round Strategy' })).toBeVisible();
    await expect(page.locator('h3', { hasText: 'Insights' })).toBeVisible();
    await expect(page.locator('h4', { hasText: 'Technical Debt' })).toBeVisible();
    await expect(page.locator('h3', { hasText: 'Decisions' })).toBeVisible();
    await expect(page.locator('h4', { hasText: 'Hiring Freeze Lifted' })).toBeVisible();
  });

  test('E2E_T1_DASH_05: Verify sidebar navigation links exist and are active', async ({ page }) => {
    await page.goto('/dashboard');
    const sidebar = page.locator('nav');
    await expect(sidebar.locator('text=Context')).toBeVisible();
    await expect(sidebar.locator('text=Meetings')).toBeVisible();
    await expect(sidebar.locator('text=Team')).toBeVisible();
    await expect(sidebar.locator('text=Decisions')).toBeVisible();
    await expect(sidebar.locator('text=Reports')).toBeVisible();
    await expect(sidebar.locator('text=Settings')).toBeVisible();
    await expect(sidebar.locator('text=Support')).toBeVisible();
  });
});

test.describe('Feature 4: Executive Team (TEAM)', () => {
  test('E2E_T1_TEAM_01: Verify team view displays the executive board profiles', async ({ page }) => {
    await page.goto('/team');
    await expect(page.locator('text=Aura')).toBeVisible();
    await expect(page.locator('text=Vault')).toBeVisible();
    await expect(page.locator('text=Nexus')).toBeVisible();
    await expect(page.locator('text=Prism')).toBeVisible();
    await expect(page.locator('text=Echo')).toBeVisible();
  });

  test('E2E_T1_TEAM_02: Verify executive profiles list their correct corporate roles', async ({ page }) => {
    await page.goto('/team');
    await expect(page.locator('text=Growth Lead')).toBeVisible();
    await expect(page.locator('text=Investor Proxy')).toBeVisible();
    await expect(page.locator('text=CTO')).toBeVisible();
    await expect(page.locator('text=Product Strategy')).toBeVisible();
    await expect(page.locator('text=Customer Advocate')).toBeVisible();
  });

  test('E2E_T1_TEAM_03: Verify team cards show specific biases', async ({ page }) => {
    await page.goto('/team');
    await expect(page.locator('text=Capital efficiency and downside protection')).toBeVisible();
  });

  test('E2E_T1_TEAM_04: Verify clicking profile card displays detail modal', async ({ page }) => {
    await page.goto('/team');
    await page.click('text=Aura');
    await expect(page.locator('[role="dialog"]')).toBeVisible();
  });

  test('E2E_T1_TEAM_05: Verify Invite Member button functionality', async ({ page }) => {
    await page.goto('/settings');
    const inviteBtn = page.locator('button', { hasText: 'Invite Member' });
    await expect(inviteBtn).toBeVisible();
    await inviteBtn.click();
    await expect(page.locator('[role="dialog"]')).toBeVisible();
  });
});

test.describe('Feature 5: Board Meetings (MEET)', () => {
  test('E2E_T1_MEET_01: Verify board meetings details page displays decision timeline', async ({ page }) => {
    await page.goto('/meetings/nimbus');
    await expect(page.locator('text=09:42 AM UTC')).toBeVisible();
  });

  test('E2E_T1_MEET_02: Verify board meetings details page shows consensus meter visualization', async ({ page }) => {
    await page.goto('/meetings/nimbus');
    await expect(page.locator('text=Consensus')).toBeVisible();
    await expect(page.locator('text=84%')).toBeVisible();
  });

  test('E2E_T1_MEET_03: Verify speaking indicator is active next to current speaker', async ({ page }) => {
    await page.goto('/meetings/nimbus');
    await expect(page.locator('text=Speaking')).toBeVisible();
  });

  test('E2E_T1_MEET_04: Verify live debate transcript renders messages with distinct agent branding', async ({ page }) => {
    await page.goto('/meetings/nimbus');
    await expect(page.locator('text=Prism')).toBeVisible();
    await expect(page.locator('text=Vault')).toBeVisible();
    await expect(page.locator('text=Aura')).toBeVisible();
  });

  test('E2E_T1_MEET_05: Verify recommendation panel is visible and contains Ratify button', async ({ page }) => {
    await page.goto('/meetings/nimbus');
    await expect(page.locator('text=PROCEED WITH CAUTION (PHASED ROLLOUT)')).toBeVisible();
    await expect(page.locator('button', { hasText: 'Ratify' })).toBeVisible();
  });
});

test.describe('Feature 6: Reports List (REP)', () => {
  test('E2E_T1_REP_01: Verify reports view lists available startup reports', async ({ page }) => {
    await page.goto('/reports');
    await expect(page.locator('text=roadmap updates')).toBeVisible();
  });

  test('E2E_T1_REP_02: Verify each report displays metadata', async ({ page }) => {
    await page.goto('/reports');
    await expect(page.locator('.metadata-timestamp')).toBeVisible();
  });

  test('E2E_T1_REP_03: Verify download buttons for each report', async ({ page }) => {
    await page.goto('/reports');
    const downloadBtn = page.locator('button.download-btn').first();
    await expect(downloadBtn).toBeVisible();
  });

  test('E2E_T1_REP_04: Verify search bar filters the reports list', async ({ page }) => {
    await page.goto('/reports');
    const searchInput = page.locator('input[placeholder*="Search"]');
    await expect(searchInput).toBeVisible();
    await searchInput.fill('audit');
    await expect(page.locator('text=audit')).toBeVisible();
  });

  test('E2E_T1_REP_05: Verify newly uploaded documents are listed', async ({ page }) => {
    await page.goto('/reports');
    await expect(page.locator('text=uploaded-report.pdf')).toBeVisible();
  });
});

test.describe('Feature 7: Settings (SETT)', () => {
  test('E2E_T1_SETT_01: Verify settings page displays SYSTEM CONFIG header', async ({ page }) => {
    await page.goto('/settings');
    await expect(page.locator('h1')).toContainText('SYSTEM');
    await expect(page.locator('h1')).toContainText('CONFIG');
  });

  test('E2E_T1_SETT_02: Verify sliders load with expected defaults', async ({ page }) => {
    await page.goto('/settings');
    const riskSlider = page.locator('input[type="range"]').nth(0);
    const innovationSlider = page.locator('input[type="range"]').nth(1);
    const ethicsSlider = page.locator('input[type="range"]').nth(2);
    
    await expect(riskSlider).toHaveValue('65');
    await expect(innovationSlider).toHaveValue('80');
    await expect(ethicsSlider).toHaveValue('95');
  });

  test('E2E_T1_SETT_03: Verify data ingestion toggles can be checked/unchecked', async ({ page }) => {
    await page.goto('/settings');
    const toggleSalesforce = page.locator('input#toggle1');
    await expect(toggleSalesforce).toBeChecked();
    await toggleSalesforce.uncheck();
    await expect(toggleSalesforce).not.toBeChecked();
  });

  test('E2E_T1_SETT_04: Verify organization name input and License Tier badge', async ({ page }) => {
    await page.goto('/settings');
    const orgInput = page.locator('input[type="text"][value="Acme Corporation"]');
    await expect(orgInput).toBeVisible();
    await expect(page.locator('text=ENTERPRISE')).toBeVisible();
  });

  test('E2E_T1_SETT_05: Verify clicking Commit Protocol Changes triggers saving', async ({ page }) => {
    await page.goto('/settings');
    const commitBtn = page.locator('button', { hasText: 'Commit Protocol Changes' });
    await expect(commitBtn).toBeVisible();
    await commitBtn.click();
    await expect(page.locator('.toast-success')).toBeVisible();
  });
});

test.describe('Feature 8: Document Upload (UPLOAD)', () => {
  test('E2E_T1_UPLOAD_01: Verify document upload area is present on Reports page', async ({ page }) => {
    await page.goto('/reports');
    await expect(page.locator('.upload-area')).toBeVisible();
  });

  test('E2E_T1_UPLOAD_02: Verify file input accepts PDF and txt files', async ({ page }) => {
    await page.goto('/reports');
    const fileInput = page.locator('input[type="file"]');
    await expect(fileInput).toHaveAttribute('accept', /.*pdf.*txt.*/);
  });

  test('E2E_T1_UPLOAD_03: Verify selected file is previewed with name and size', async ({ page }) => {
    await page.goto('/reports');
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles({
      name: 'test.pdf',
      mimeType: 'application/pdf',
      buffer: Buffer.from('dummy-pdf-content'),
    });
    await expect(page.locator('.file-preview-name')).toContainText('test.pdf');
  });

  test('E2E_T1_UPLOAD_04: Verify clicking Upload initiates flow and shows notification', async ({ page }) => {
    await page.goto('/reports');
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles({
      name: 'test.pdf',
      mimeType: 'application/pdf',
      buffer: Buffer.from('dummy-pdf-content'),
    });
    await page.click('button:has-text("Upload")');
    await expect(page.locator('.upload-success-toast')).toBeVisible();
  });

  test('E2E_T1_UPLOAD_05: Verify database updates metadata record for the uploaded document', async ({ page }) => {
    await page.goto('/reports');
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles({
      name: 'test.pdf',
      mimeType: 'application/pdf',
      buffer: Buffer.from('dummy-pdf-content'),
    });
    await page.click('button:has-text("Upload")');
    await expect(page.locator('.db-synced-badge')).toBeVisible();
  });
});
