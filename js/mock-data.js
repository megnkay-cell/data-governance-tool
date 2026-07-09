const MOCK_DATA = {
  dataObjects: [
    // SALES
    {
      id: 1, name: 'customer_transactions',
      qualifiedName: 'prod.sales.customer_transactions',
      objectType: 'Table', domain: 'Sales', steward: 'Jane Smith',
      dataSource: 'Snowflake - Production', schema: 'sales',
      tags: ['PII', 'Financial'],
      certificationStatus: 'Certified',
      description: 'All customer transaction records including purchases, returns, and refunds.',
      lastUpdated: '2024-03-15', rowCount: 12500000
    },
    {
      id: 2, name: 'sales_pipeline',
      qualifiedName: 'prod.sales.sales_pipeline',
      objectType: 'Table', domain: 'Sales', steward: 'Jane Smith',
      dataSource: 'Snowflake - Production', schema: 'sales',
      tags: ['Internal'],
      certificationStatus: 'Certified',
      description: 'Current and historical sales pipeline data by rep and region.',
      lastUpdated: '2024-03-18', rowCount: 45000
    },
    {
      id: 3, name: 'vw_revenue_summary',
      qualifiedName: 'prod.sales.vw_revenue_summary',
      objectType: 'View', domain: 'Sales', steward: 'Jane Smith',
      dataSource: 'Snowflake - Production', schema: 'reporting',
      tags: ['Financial', 'Internal'],
      certificationStatus: 'Certified',
      description: 'Aggregated revenue summary by region, product, and time period.',
      lastUpdated: '2024-03-10', rowCount: null
    },
    {
      id: 4, name: 'customer_segments',
      qualifiedName: 'prod.sales.customer_segments',
      objectType: 'Table', domain: 'Sales', steward: 'Michael Chen',
      dataSource: 'Redshift - Analytics', schema: 'analytics',
      tags: ['PII', 'Marketing'],
      certificationStatus: 'Needs Review',
      description: 'Customer segmentation model outputs with RFM scores and segment assignments.',
      lastUpdated: '2024-02-28', rowCount: 890000
    },
    {
      id: 5, name: 'product_catalog',
      qualifiedName: 'prod.sales.product_catalog',
      objectType: 'Table', domain: 'Sales', steward: 'Michael Chen',
      dataSource: 'MySQL - CRM', schema: 'public',
      tags: ['Public'],
      certificationStatus: 'Certified',
      description: 'Master product catalog with pricing, categories, and availability.',
      lastUpdated: '2024-03-20', rowCount: 15200
    },
    {
      id: 6, name: 'vw_sales_kpis',
      qualifiedName: 'prod.sales.vw_sales_kpis',
      objectType: 'View', domain: 'Sales', steward: 'Jane Smith',
      dataSource: 'Snowflake - Production', schema: 'reporting',
      tags: ['Internal', 'Financial'],
      certificationStatus: 'Warning',
      description: 'Key performance indicators for the sales team. Note: metric definitions are under revision.',
      lastUpdated: '2024-01-15', rowCount: null
    },
    // FINANCE
    {
      id: 7, name: 'general_ledger',
      qualifiedName: 'prod.finance.general_ledger',
      objectType: 'Table', domain: 'Finance', steward: 'Sarah Johnson',
      dataSource: 'Snowflake - Production', schema: 'finance',
      tags: ['Financial', 'Compliance', 'Sensitive'],
      certificationStatus: 'Certified',
      description: 'General ledger entries for all financial transactions across the organization.',
      lastUpdated: '2024-03-19', rowCount: 5600000
    },
    {
      id: 8, name: 'budget_allocations',
      qualifiedName: 'prod.finance.budget_allocations',
      objectType: 'Table', domain: 'Finance', steward: 'Sarah Johnson',
      dataSource: 'Snowflake - Production', schema: 'finance',
      tags: ['Financial', 'Internal', 'Sensitive'],
      certificationStatus: 'Certified',
      description: 'Annual and quarterly budget allocations by department and cost center.',
      lastUpdated: '2024-01-02', rowCount: 3400
    },
    {
      id: 9, name: 'vendor_payments',
      qualifiedName: 'prod.finance.vendor_payments',
      objectType: 'Table', domain: 'Finance', steward: 'Sarah Johnson',
      dataSource: 'PostgreSQL - Finance', schema: 'accounts_payable',
      tags: ['Financial', 'Compliance'],
      certificationStatus: 'Certified',
      description: 'Vendor payment records and approval workflows.',
      lastUpdated: '2024-03-17', rowCount: 230000
    },
    {
      id: 10, name: 'vw_monthly_close',
      qualifiedName: 'prod.finance.vw_monthly_close',
      objectType: 'View', domain: 'Finance', steward: 'Sarah Johnson',
      dataSource: 'Snowflake - Production', schema: 'finance',
      tags: ['Financial', 'Compliance'],
      certificationStatus: 'Deprecated',
      description: 'Monthly close summary view. Deprecated — use vw_close_v2 instead.',
      lastUpdated: '2023-06-01', rowCount: null
    },
    {
      id: 11, name: 'cost_centers',
      qualifiedName: 'prod.finance.cost_centers',
      objectType: 'Table', domain: 'Finance', steward: 'David Park',
      dataSource: 'PostgreSQL - Finance', schema: 'org',
      tags: ['Internal'],
      certificationStatus: 'Certified',
      description: 'Organizational cost center hierarchy and metadata.',
      lastUpdated: '2024-02-14', rowCount: 450
    },
    // MARKETING
    {
      id: 12, name: 'campaign_performance',
      qualifiedName: 'prod.marketing.campaign_performance',
      objectType: 'Table', domain: 'Marketing', steward: 'Lisa Rodriguez',
      dataSource: 'Redshift - Analytics', schema: 'marketing',
      tags: ['Marketing', 'Internal'],
      certificationStatus: 'Certified',
      description: 'Campaign-level performance metrics including impressions, clicks, conversions, and ROI.',
      lastUpdated: '2024-03-20', rowCount: 125000
    },
    {
      id: 13, name: 'email_subscribers',
      qualifiedName: 'prod.marketing.email_subscribers',
      objectType: 'Table', domain: 'Marketing', steward: 'Lisa Rodriguez',
      dataSource: 'MySQL - CRM', schema: 'marketing',
      tags: ['PII', 'Marketing', 'Compliance'],
      certificationStatus: 'Certified',
      description: 'Email subscriber list with consent records and preference settings.',
      lastUpdated: '2024-03-21', rowCount: 2100000
    },
    {
      id: 14, name: 'attribution_model',
      qualifiedName: 'prod.marketing.attribution_model',
      objectType: 'Table', domain: 'Marketing', steward: 'Michael Chen',
      dataSource: 'Redshift - Analytics', schema: 'analytics',
      tags: ['Marketing', 'Internal'],
      certificationStatus: 'Needs Review',
      description: 'Multi-touch attribution model outputs. Currently under validation.',
      lastUpdated: '2024-02-10', rowCount: 560000
    },
    {
      id: 15, name: 'vw_marketing_dashboard',
      qualifiedName: 'prod.marketing.vw_marketing_dashboard',
      objectType: 'View', domain: 'Marketing', steward: 'Lisa Rodriguez',
      dataSource: 'Redshift - Analytics', schema: 'reporting',
      tags: ['Marketing', 'Internal'],
      certificationStatus: 'Certified',
      description: 'Consolidated marketing KPIs for the executive dashboard.',
      lastUpdated: '2024-03-15', rowCount: null
    },
    // HR
    {
      id: 16, name: 'employee_records',
      qualifiedName: 'prod.hr.employee_records',
      objectType: 'Table', domain: 'HR', steward: 'Tom Williams',
      dataSource: 'PostgreSQL - HR', schema: 'hr',
      tags: ['PII', 'Sensitive', 'Compliance'],
      certificationStatus: 'Certified',
      description: 'Core employee records including personal information, employment history, and compensation.',
      lastUpdated: '2024-03-22', rowCount: 8500
    },
    {
      id: 17, name: 'performance_reviews',
      qualifiedName: 'prod.hr.performance_reviews',
      objectType: 'Table', domain: 'HR', steward: 'Tom Williams',
      dataSource: 'PostgreSQL - HR', schema: 'hr',
      tags: ['PII', 'Sensitive'],
      certificationStatus: 'Certified',
      description: 'Annual and semi-annual performance review data by employee.',
      lastUpdated: '2024-01-31', rowCount: 42000
    },
    {
      id: 18, name: 'headcount_plan',
      qualifiedName: 'prod.hr.headcount_plan',
      objectType: 'Table', domain: 'HR', steward: 'Tom Williams',
      dataSource: 'Snowflake - Production', schema: 'planning',
      tags: ['Sensitive', 'Internal'],
      certificationStatus: 'Needs Review',
      description: 'Forward-looking headcount planning by department and quarter.',
      lastUpdated: '2024-02-20', rowCount: 1200
    },
    {
      id: 19, name: 'vw_org_chart',
      qualifiedName: 'prod.hr.vw_org_chart',
      objectType: 'View', domain: 'HR', steward: 'Tom Williams',
      dataSource: 'PostgreSQL - HR', schema: 'hr',
      tags: ['Internal'],
      certificationStatus: 'Certified',
      description: 'Current organizational chart with reporting relationships.',
      lastUpdated: '2024-03-18', rowCount: null
    },
    {
      id: 20, name: 'benefits_enrollment',
      qualifiedName: 'prod.hr.benefits_enrollment',
      objectType: 'Table', domain: 'HR', steward: 'David Park',
      dataSource: 'PostgreSQL - HR', schema: 'hr',
      tags: ['PII', 'Sensitive', 'Compliance'],
      certificationStatus: 'Certified',
      description: 'Employee benefits enrollment elections and dependent information.',
      lastUpdated: '2024-01-15', rowCount: 18000
    },
    // OPERATIONS
    {
      id: 21, name: 'inventory_levels',
      qualifiedName: 'prod.ops.inventory_levels',
      objectType: 'Table', domain: 'Operations', steward: 'David Park',
      dataSource: 'MySQL - CRM', schema: 'inventory',
      tags: ['Internal'],
      certificationStatus: 'Certified',
      description: 'Real-time and historical inventory levels by SKU, warehouse, and location.',
      lastUpdated: '2024-03-22', rowCount: 4200000
    },
    {
      id: 22, name: 'supply_chain_events',
      qualifiedName: 'prod.ops.supply_chain_events',
      objectType: 'Table', domain: 'Operations', steward: 'David Park',
      dataSource: 'Snowflake - Production', schema: 'ops',
      tags: ['Internal'],
      certificationStatus: 'Warning',
      description: 'Supply chain event log. Schema migration in progress — use with caution.',
      lastUpdated: '2024-03-01', rowCount: 8900000
    },
    {
      id: 23, name: 'vw_fulfillment_metrics',
      qualifiedName: 'prod.ops.vw_fulfillment_metrics',
      objectType: 'View', domain: 'Operations', steward: 'David Park',
      dataSource: 'Snowflake - Production', schema: 'reporting',
      tags: ['Internal'],
      certificationStatus: 'Certified',
      description: 'Order fulfillment rate and SLA metrics by region and carrier.',
      lastUpdated: '2024-03-10', rowCount: null
    },
    {
      id: 24, name: 'vendor_master',
      qualifiedName: 'prod.ops.vendor_master',
      objectType: 'Table', domain: 'Operations', steward: 'Sarah Johnson',
      dataSource: 'PostgreSQL - Finance', schema: 'procurement',
      tags: ['Internal', 'Compliance'],
      certificationStatus: 'Certified',
      description: 'Master vendor registry with contact, contract, and compliance information.',
      lastUpdated: '2024-03-05', rowCount: 3200
    },
    {
      id: 25, name: 'shipping_logs',
      qualifiedName: 'prod.ops.shipping_logs',
      objectType: 'Table', domain: 'Operations', steward: 'David Park',
      dataSource: 'MySQL - CRM', schema: 'logistics',
      tags: ['Internal'],
      certificationStatus: 'Uncertified',
      description: 'Inbound and outbound shipment tracking logs.',
      lastUpdated: '2024-03-22', rowCount: 22000000
    }
  ]
};
