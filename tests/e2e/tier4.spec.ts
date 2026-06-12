import { test, expect } from '@playwright/test';

test.describe('Tier 4: Real-world User Journeys', () => {
  
  test('E2E_T4_JOURNEY_01: Nimbus Startup VC Metrics Simulation', async ({ page }) => {
    // 1. Sign in with founder credentials
    await page.goto('/signin');
    await page.fill('#email', 'executive@boardroom.com');
    await page.fill('#password', 'password123');
    await page.click('button:has-text("ENTER BOARDROOM")');
    await expect(page).toHaveURL(/\/dashboard/);

    // 2. View dashboard system status and metrics
    await expect(page.locator('h1')).toContainText('WELCOME, FOUNDER');
    await expect(page.locator('body')).toContainText('SYSTEM STATUS: NOMINAL');

    // 3. Navigate to Reports page and upload "Nimbus Q3 Product Pitch.pdf"
    await page.click('a:has-text("Reports")');
    await expect(page).toHaveURL(/\/reports/);
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles({
      name: 'Nimbus Q3 Product Pitch.pdf',
      mimeType: 'application/pdf',
      buffer: Buffer.from('mock pitch document')
    });
    await page.click('button:has-text("Upload")');
    await expect(page.locator('.report-item:has-text("Nimbus Q3 Product Pitch.pdf")')).toBeVisible();

    // 4. Navigate to Meetings page and open "Q3 Funding Round" board meeting
    await page.click('a:has-text("Meetings")');
    await expect(page).toHaveURL(/\/meetings/);
    await page.click('.meeting-item:has-text("Q3 Funding Round")');
    
    // 5. Input question: "Should we raise venture debt or extend runway with existing investors?"
    await page.fill('input[placeholder="ASK THE BOARD..."]', 'Should we raise venture debt or extend runway with existing investors?');
    await page.click('button:has-text("send")');

    // 6. Verify debate: CTO and CFO express conflicting views
    // Verify specific agent names and conflicting concepts appear in the debate transcript
    const bodyText = await page.locator('body').textContent();
    expect(bodyText).toContain('Nexus'); // CTO
    expect(bodyText).toContain('Vault'); // CFO / Investor Proxy
    expect(bodyText).toMatch(/(liquidity|dilution|interest|runway|architect|risk)/i);

    // 7. Ratify the board consensus recommendation ("PHASED ROLLOUT")
    await expect(page.locator('body')).toContainText('PROCEED WITH CAUTION (PHASED ROLLOUT)');
    await page.click('button:has-text("Ratify")');

    // 8. Return to Dashboard and verify "PHASED ROLLOUT" is logged in "Recent Decisions"
    await page.click('a:has-text("Context")');
    await expect(page).toHaveURL(/\/dashboard/);
    const decisionsSection = page.locator('section:has-text("Decisions")');
    await expect(decisionsSection).toContainText('PROCEED WITH CAUTION');
  });

  test('E2E_T4_JOURNEY_02: GDPR Compliance Strategy', async ({ page }) => {
    // 1. Log in, go to settings and toggle Bloomberg API on, updates Risk Tolerance to Conservative (10%)
    await page.goto('/signin');
    await page.fill('#email', 'executive@boardroom.com');
    await page.fill('#password', 'password123');
    await page.click('button:has-text("ENTER BOARDROOM")');
    await expect(page).toHaveURL(/\/dashboard/);

    await page.click('a:has-text("Settings")');
    await expect(page).toHaveURL(/\/settings/);
    
    // Toggle Bloomberg API on (toggle2)
    const bloombergToggle = page.locator('#toggle2');
    await bloombergToggle.setChecked(true);

    // Set Risk Tolerance slider to Conservative (10%)
    const riskSlider = page.locator('input[type="range"]').first();
    await riskSlider.fill('10');
    await page.click('button:has-text("Commit Protocol Changes")');

    // 2. Upload European market data
    await page.click('a:has-text("Reports")');
    await expect(page).toHaveURL(/\/reports/);
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles({
      name: 'EU_Market_GDPR_Data.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from('GDPR compliance rules and European market metrics')
    });
    await page.click('button:has-text("Upload")');

    // 3. Navigate to meetings and start a meeting "GDPR Compliance Blockers"
    await page.click('a:has-text("Meetings")');
    await expect(page).toHaveURL(/\/meetings/);
    
    // Start a new meeting
    await page.click('button:has-text("New Decision")'); // Or Start Meeting button
    await page.fill('#meeting-topic', 'GDPR Compliance Blockers');
    await page.click('button:has-text("Start Meeting")');

    // 4. Ask the board about scaling in Germany
    await page.fill('input[placeholder="ASK THE BOARD..."]', 'Should we scale in Germany immediately despite restrictive covenants?');
    await page.click('button:has-text("send")');

    // 5. Verify General Counsel warns about restrictive covenants
    const transcriptText = await page.locator('body').textContent();
    expect(transcriptText).toContain('General Counsel');
    expect(transcriptText).toMatch(/(covenant|restrictive|compliance|fine|gdpr|germany)/i);

    // 6. Ratify "Defer expansion until compliance audit is complete"
    await page.click('button:has-text("Ratify")');

    // 7. Verify recent decisions list update on dashboard
    await page.click('a:has-text("Context")');
    await expect(page).toHaveURL(/\/dashboard/);
    const decisionsSection = page.locator('section:has-text("Decisions")');
    await expect(decisionsSection).toContainText('Defer expansion until compliance audit is complete');
  });

  test('E2E_T4_JOURNEY_03: Technical Pivot Roadmap', async ({ page }) => {
    // 1. Log in, go to settings, set Innovation Bias to Disruptive (90%)
    await page.goto('/signin');
    await page.fill('#email', 'executive@boardroom.com');
    await page.fill('#password', 'password123');
    await page.click('button:has-text("ENTER BOARDROOM")');
    
    await page.click('a:has-text("Settings")');
    const innovationSlider = page.locator('input[type="range"]').nth(1); // Second slider is Innovation Bias
    await innovationSlider.fill('90');
    await page.click('button:has-text("Commit Protocol Changes")');

    // 2. Upload roadmap plan document
    await page.click('a:has-text("Reports")');
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles({
      name: 'Technical_Pivot_Roadmap.pdf',
      mimeType: 'application/pdf',
      buffer: Buffer.from('Pivot details from monolith to microservices')
    });
    await page.click('button:has-text("Upload")');

    // 3. Start meeting "Technical Pivot", ask "Should we refactor the core system now or build new features?"
    await page.click('a:has-text("Meetings")');
    await page.click('button:has-text("New Decision")');
    await page.fill('#meeting-topic', 'Technical Pivot');
    await page.click('button:has-text("Start Meeting")');
    
    await page.fill('input[placeholder="ASK THE BOARD..."]', 'Should we refactor the core system now or build new features?');
    await page.click('button:has-text("send")');

    // 4. Verify CTO (Architect) and Growth Lead (Catalyst) debate
    const debateText = await page.locator('body').textContent();
    expect(debateText).toContain('Nexus'); // CTO / Architect
    expect(debateText).toContain('Aura'); // Growth Lead / Catalyst
    expect(debateText).toMatch(/(refactor|latency|sprints|velocity|growth|disrupt)/i);

    // 5. Ratify "Approve pivot with phased engineering sprints"
    await page.click('button:has-text("Ratify")');

    // 6. Verify decision log and reports counts
    await page.click('a:has-text("Context")');
    await expect(page).toHaveURL(/\/dashboard/);
    const decisionsSection = page.locator('section:has-text("Decisions")');
    await expect(decisionsSection).toContainText('Approve pivot with phased engineering sprints');
    await expect(page.locator('#reports-count-widget')).toContainText('1'); // verified reports count updated
  });

  test('E2E_T4_JOURNEY_04: Co-founder Transition Plan', async ({ page }) => {
    // 1. Log in, go to settings / team settings
    await page.goto('/signin');
    await page.fill('#email', 'executive@boardroom.com');
    await page.fill('#password', 'password123');
    await page.click('button:has-text("ENTER BOARDROOM")');

    await page.click('a:has-text("Settings")');
    
    // 2. Invite a new executive board member (Jane Doe, Chief Strategy Officer)
    await page.click('button:has-text("Invite Member")');
    await page.fill('#member-name', 'Jane Doe');
    await page.fill('#member-email', 'jane.doe@nimbus.com');
    await page.fill('#member-role', 'Chief Strategy Officer');
    await page.click('button:has-text("Send Invitation")');

    // 3. Starts meeting "Co-founder Exit and Transition"
    await page.click('a:has-text("Meetings")');
    await page.click('button:has-text("New Decision")');
    await page.fill('#meeting-topic', 'Co-founder Exit and Transition');
    await page.click('button:has-text("Start Meeting")');

    // 4. Asks board how to structure equity buyback
    await page.fill('input[placeholder="ASK THE BOARD..."]', 'How should we structure the co-founder equity buyback plan?');
    await page.click('button:has-text("send")');

    // 5. Verify CFO (Auditor) and HR debate, ratifies "Defer buyback details until legal review"
    const transcriptText = await page.locator('body').textContent();
    expect(transcriptText).toContain('Vault'); // CFO / Auditor
    expect(transcriptText).toContain('HR'); // HR / Agent
    expect(transcriptText).toMatch(/(buyback|equity|legal|valuation|shares)/i);
    await page.click('button:has-text("Ratify")');

    // 6. Verify updated team roster and decisions log
    await page.click('a:has-text("Team")');
    await expect(page.locator('.team-card:has-text("Jane Doe")')).toBeVisible();

    await page.click('a:has-text("Context")');
    await expect(page.locator('section:has-text("Decisions")')).toContainText('Defer buyback details until legal review');
  });

  test('E2E_T4_JOURNEY_05: Paid Advertising CAC Optimization', async ({ page }) => {
    // 1. Log in, updates settings toggling Salesforce CRM ingestion on
    await page.goto('/signin');
    await page.fill('#email', 'executive@boardroom.com');
    await page.fill('#password', 'password123');
    await page.click('button:has-text("ENTER BOARDROOM")');

    await page.click('a:has-text("Settings")');
    const salesforceToggle = page.locator('#toggle1');
    await salesforceToggle.setChecked(true);
    await page.click('button:has-text("Commit Protocol Changes")');

    // 2. Upload Q3 marketing expense document
    await page.click('a:has-text("Reports")');
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles({
      name: 'Q3_Marketing_Expenses.pdf',
      mimeType: 'application/pdf',
      buffer: Buffer.from('Adwords, Facebook, and LinkedIn advertising metrics')
    });
    await page.click('button:has-text("Upload")');

    // 3. Starts meeting "Paid Marketing Reallocation"
    await page.click('a:has-text("Meetings")');
    await page.click('button:has-text("New Decision")');
    await page.fill('#meeting-topic', 'Paid Marketing Reallocation');
    await page.click('button:has-text("Start Meeting")');

    // 4. Asks "Should we increase paid ads budget or optimize organic loops?"
    await page.fill('input[placeholder="ASK THE BOARD..."]', 'Should we increase paid ads budget or optimize organic loops?');
    await page.click('button:has-text("send")');

    // 5. Growth Lead and Risk Proxy debate, ratifies "Approve budget reallocation capped at $30k"
    const transcriptText = await page.locator('body').textContent();
    expect(transcriptText).toContain('Aura'); // Growth Lead
    expect(transcriptText).toMatch(/(budget|cac|organic|channels|acquisition)/i);
    await page.click('button:has-text("Ratify")');

    // 6. Verifies reports counts and decisions log
    await page.click('a:has-text("Context")');
    await expect(page.locator('section:has-text("Decisions")')).toContainText('Approve budget reallocation capped at $30k');
  });
});
