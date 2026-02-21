-- Sales dashboard: leads table for pipeline and revenue metrics
CREATE TABLE IF NOT EXISTS leads (
  id         SERIAL PRIMARY KEY,
  status     VARCHAR(50) NOT NULL,
  revenue    INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads (created_at);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads (status);
