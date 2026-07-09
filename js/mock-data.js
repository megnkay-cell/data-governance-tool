const MOCK_DATA = {
  dataObjects: [

    // ── PLAN ─────────────────────────────────────────────
    {
      id: 1, name: 'demand_forecast',
      qualifiedName: 'prod.plan.demand_forecast',
      objectType: 'Table', domain: 'Planning', steward: 'Sarah Johnson',
      dataSource: 'Oracle SCM Cloud', schema: 'plan',
      tags: ['Internal'], pillar: 'Plan',
      certificationStatus: 'Certified',
      description: 'Statistical and consensus demand forecast by SKU, region, and planning horizon.',
      lastUpdated: '2024-03-20', rowCount: 340000
    },
    {
      id: 2, name: 'capacity_plan',
      qualifiedName: 'prod.plan.capacity_plan',
      objectType: 'Table', domain: 'Planning', steward: 'Sarah Johnson',
      dataSource: 'Oracle SCM Cloud', schema: 'plan',
      tags: ['Internal', 'Sensitive'], pillar: 'Plan',
      certificationStatus: 'Certified',
      description: 'Production capacity plan by plant, line, and period. Used for S&OP.',
      lastUpdated: '2024-03-18', rowCount: 12000
    },
    {
      id: 3, name: 's_and_op_targets',
      qualifiedName: 'prod.plan.s_and_op_targets',
      objectType: 'Table', domain: 'Planning', steward: 'David Park',
      dataSource: 'Snowflake - Data Warehouse', schema: 'plan',
      tags: ['Internal', 'Sensitive'], pillar: 'Plan',
      certificationStatus: 'Needs Review',
      description: 'Agreed S&OP volume and revenue targets by product family and region.',
      lastUpdated: '2024-02-15', rowCount: 4800
    },
    {
      id: 4, name: 'budget_allocations',
      qualifiedName: 'prod.finance.budget_allocations',
      objectType: 'Table', domain: 'Finance', steward: 'Sarah Johnson',
      dataSource: 'Snowflake - Data Warehouse', schema: 'finance',
      tags: ['Financial', 'Internal', 'Sensitive'], pillar: 'Plan',
      certificationStatus: 'Certified',
      description: 'Annual and quarterly supply chain budget allocations by function and cost center.',
      lastUpdated: '2024-01-02', rowCount: 3400
    },
    {
      id: 5, name: 'cost_centers',
      qualifiedName: 'prod.finance.cost_centers',
      objectType: 'Table', domain: 'Finance', steward: 'David Park',
      dataSource: 'PostgreSQL - Finance', schema: 'org',
      tags: ['Internal'], pillar: 'Plan',
      certificationStatus: 'Certified',
      description: 'Organizational cost center hierarchy supporting supply chain financial planning.',
      lastUpdated: '2024-02-14', rowCount: 450
    },

    // ── SOURCE ───────────────────────────────────────────
    {
      id: 6, name: 'vendor_master',
      qualifiedName: 'prod.source.vendor_master',
      objectType: 'Table', domain: 'Procurement', steward: 'Tom Williams',
      dataSource: 'SAP S/4HANA - Production', schema: 'procurement',
      tags: ['Internal', 'Compliance'], pillar: 'Source',
      certificationStatus: 'Certified',
      description: 'Master vendor registry with contact, contract, and compliance information.',
      lastUpdated: '2024-03-05', rowCount: 3200
    },
    {
      id: 7, name: 'purchase_orders',
      qualifiedName: 'prod.source.purchase_orders',
      objectType: 'Table', domain: 'Procurement', steward: 'Tom Williams',
      dataSource: 'SAP S/4HANA - Production', schema: 'procurement',
      tags: ['Financial', 'Internal'], pillar: 'Source',
      certificationStatus: 'Certified',
      description: 'All purchase orders including status, line items, quantities, and delivery dates.',
      lastUpdated: '2024-03-22', rowCount: 1850000
    },
    {
      id: 8, name: 'supplier_scorecard',
      qualifiedName: 'prod.source.supplier_scorecard',
      objectType: 'Table', domain: 'Procurement', steward: 'Tom Williams',
      dataSource: 'Snowflake - Data Warehouse', schema: 'analytics',
      tags: ['Internal'], pillar: 'Source',
      certificationStatus: 'Warning',
      description: 'Supplier performance scorecard covering quality, delivery, cost, and compliance. KPI definitions under revision.',
      lastUpdated: '2024-02-01', rowCount: 9600
    },
    {
      id: 9, name: 'vendor_payments',
      qualifiedName: 'prod.finance.vendor_payments',
      objectType: 'Table', domain: 'Finance', steward: 'Sarah Johnson',
      dataSource: 'PostgreSQL - Finance', schema: 'accounts_payable',
      tags: ['Financial', 'Compliance'], pillar: 'Source',
      certificationStatus: 'Certified',
      description: 'Vendor payment records, invoice approvals, and payment timing.',
      lastUpdated: '2024-03-17', rowCount: 230000
    },
    {
      id: 10, name: 'inbound_shipments',
      qualifiedName: 'prod.source.inbound_shipments',
      objectType: 'Table', domain: 'Procurement', steward: 'Tom Williams',
      dataSource: 'SAP S/4HANA - Production', schema: 'logistics',
      tags: ['Internal'], pillar: 'Source',
      certificationStatus: 'Certified',
      description: 'Inbound shipment records from suppliers including ASN, receipt confirmation, and discrepancies.',
      lastUpdated: '2024-03-22', rowCount: 4400000
    },

    // ── MAKE ─────────────────────────────────────────────
    {
      id: 11, name: 'bill_of_materials',
      qualifiedName: 'prod.make.bill_of_materials',
      objectType: 'Table', domain: 'Manufacturing', steward: 'Michael Chen',
      dataSource: 'SAP S/4HANA - Production', schema: 'manufacturing',
      tags: ['Internal'], pillar: 'Make',
      certificationStatus: 'Certified',
      description: 'Multi-level bill of materials for all finished goods and semi-finished products.',
      lastUpdated: '2024-03-12', rowCount: 275000
    },
    {
      id: 12, name: 'work_orders',
      qualifiedName: 'prod.make.work_orders',
      objectType: 'Table', domain: 'Manufacturing', steward: 'Michael Chen',
      dataSource: 'SAP S/4HANA - Production', schema: 'manufacturing',
      tags: ['Internal'], pillar: 'Make',
      certificationStatus: 'Certified',
      description: 'Production work orders with planned vs actual quantities, start/end times, and status.',
      lastUpdated: '2024-03-22', rowCount: 6700000
    },
    {
      id: 13, name: 'quality_inspections',
      qualifiedName: 'prod.make.quality_inspections',
      objectType: 'Table', domain: 'Manufacturing', steward: 'Michael Chen',
      dataSource: 'SAP S/4HANA - Production', schema: 'quality',
      tags: ['Compliance', 'Internal'], pillar: 'Make',
      certificationStatus: 'Certified',
      description: 'Quality inspection results by batch, material, and plant. Includes pass/fail and defect codes.',
      lastUpdated: '2024-03-21', rowCount: 3100000
    },
    {
      id: 14, name: 'product_catalog',
      qualifiedName: 'prod.make.product_catalog',
      objectType: 'Table', domain: 'Manufacturing', steward: 'Michael Chen',
      dataSource: 'SAP S/4HANA - Production', schema: 'master_data',
      tags: ['Public'], pillar: 'Make',
      certificationStatus: 'Certified',
      description: 'Master product catalog with material numbers, descriptions, classifications, and UOM.',
      lastUpdated: '2024-03-20', rowCount: 15200
    },
    {
      id: 15, name: 'inventory_levels',
      qualifiedName: 'prod.make.inventory_levels',
      objectType: 'Table', domain: 'Manufacturing', steward: 'David Park',
      dataSource: 'SAP S/4HANA - Production', schema: 'inventory',
      tags: ['Internal'], pillar: 'Make',
      certificationStatus: 'Needs Review',
      description: 'Stock on hand by material, plant, and storage location. Reconciliation with WMS ongoing.',
      lastUpdated: '2024-03-22', rowCount: 4200000
    },

    // ── LOGISTICS ─────────────────────────────────────────
    {
      id: 16, name: 'shipping_logs',
      qualifiedName: 'prod.logistics.shipping_logs',
      objectType: 'Table', domain: 'Logistics', steward: 'Lisa Rodriguez',
      dataSource: 'SQL Server - WMS', schema: 'logistics',
      tags: ['Internal'], pillar: 'Logistics',
      certificationStatus: 'Uncertified',
      description: 'Outbound shipment records including carrier, tracking, and delivery confirmation.',
      lastUpdated: '2024-03-22', rowCount: 22000000
    },
    {
      id: 17, name: 'warehouse_stock',
      qualifiedName: 'prod.logistics.warehouse_stock',
      objectType: 'Table', domain: 'Logistics', steward: 'Lisa Rodriguez',
      dataSource: 'SQL Server - WMS', schema: 'warehouse',
      tags: ['Internal'], pillar: 'Logistics',
      certificationStatus: 'Certified',
      description: 'Real-time warehouse stock positions by location, lot, and handling unit.',
      lastUpdated: '2024-03-22', rowCount: 8800000
    },
    {
      id: 18, name: 'carrier_performance',
      qualifiedName: 'prod.logistics.carrier_performance',
      objectType: 'Table', domain: 'Logistics', steward: 'Lisa Rodriguez',
      dataSource: 'Snowflake - Data Warehouse', schema: 'analytics',
      tags: ['Internal'], pillar: 'Logistics',
      certificationStatus: 'Certified',
      description: 'Carrier-level performance metrics: on-time delivery, damage rate, cost per shipment.',
      lastUpdated: '2024-03-15', rowCount: 48000
    },
    {
      id: 19, name: 'vw_fulfillment_metrics',
      qualifiedName: 'prod.logistics.vw_fulfillment_metrics',
      objectType: 'View', domain: 'Logistics', steward: 'Lisa Rodriguez',
      dataSource: 'Snowflake - Data Warehouse', schema: 'reporting',
      tags: ['Internal'], pillar: 'Logistics',
      certificationStatus: 'Certified',
      description: 'Order fulfillment rate and SLA performance metrics by region and carrier.',
      lastUpdated: '2024-03-10', rowCount: null
    },

    // ── CUSTOMER ──────────────────────────────────────────
    {
      id: 20, name: 'customer_orders',
      qualifiedName: 'prod.customer.customer_orders',
      objectType: 'Table', domain: 'Customer', steward: 'Jane Smith',
      dataSource: 'SAP S/4HANA - Production', schema: 'sales',
      tags: ['Internal'], pillar: 'Customer',
      certificationStatus: 'Certified',
      description: 'Customer sales orders with line items, quantities, requested dates, and fulfillment status.',
      lastUpdated: '2024-03-22', rowCount: 9200000
    },
    {
      id: 21, name: 'customer_transactions',
      qualifiedName: 'prod.customer.customer_transactions',
      objectType: 'Table', domain: 'Customer', steward: 'Jane Smith',
      dataSource: 'SAP S/4HANA - Production', schema: 'sales',
      tags: ['PII', 'Financial'], pillar: 'Customer',
      certificationStatus: 'Certified',
      description: 'Posted customer invoices, credits, and payment transactions.',
      lastUpdated: '2024-03-15', rowCount: 12500000
    },
    {
      id: 22, name: 'returns_and_claims',
      qualifiedName: 'prod.customer.returns_and_claims',
      objectType: 'Table', domain: 'Customer', steward: 'Jane Smith',
      dataSource: 'SAP S/4HANA - Production', schema: 'sales',
      tags: ['Internal', 'Compliance'], pillar: 'Customer',
      certificationStatus: 'Certified',
      description: 'Customer return orders and quality claims with reason codes and resolution status.',
      lastUpdated: '2024-03-20', rowCount: 670000
    },
    {
      id: 23, name: 'vw_customer_service_kpis',
      qualifiedName: 'prod.customer.vw_customer_service_kpis',
      objectType: 'View', domain: 'Customer', steward: 'Jane Smith',
      dataSource: 'Snowflake - Data Warehouse', schema: 'reporting',
      tags: ['Internal'], pillar: 'Customer',
      certificationStatus: 'Warning',
      description: 'Customer service level KPIs including OTIF, fill rate, and backorder rate. Metric alignment in progress.',
      lastUpdated: '2024-02-10', rowCount: null
    },
    {
      id: 24, name: 'vw_demand_signals',
      qualifiedName: 'prod.customer.vw_demand_signals',
      objectType: 'View', domain: 'Customer', steward: 'David Park',
      dataSource: 'Redshift - Analytics', schema: 'demand',
      tags: ['Internal'], pillar: 'Customer',
      certificationStatus: 'Needs Review',
      description: 'Aggregated customer demand signals from orders, forecasts, and VMI feeds for demand sensing.',
      lastUpdated: '2024-03-01', rowCount: null
    },

    // ── E2E ───────────────────────────────────────────────
    {
      id: 25, name: 'supply_chain_events',
      qualifiedName: 'prod.e2e.supply_chain_events',
      objectType: 'Table', domain: 'E2E Analytics', steward: 'David Park',
      dataSource: 'Snowflake - Data Warehouse', schema: 'ops',
      tags: ['Internal'], pillar: 'E2E',
      certificationStatus: 'Warning',
      description: 'Cross-functional supply chain event log used for end-to-end visibility. Schema migration in progress.',
      lastUpdated: '2024-03-01', rowCount: 8900000
    },
    {
      id: 26, name: 'vw_otif_metrics',
      qualifiedName: 'prod.e2e.vw_otif_metrics',
      objectType: 'View', domain: 'E2E Analytics', steward: 'David Park',
      dataSource: 'Snowflake - Data Warehouse', schema: 'reporting',
      tags: ['Internal'], pillar: 'E2E',
      certificationStatus: 'Certified',
      description: 'On Time In Full (OTIF) metrics end-to-end from supplier to customer, broken down by plant and lane.',
      lastUpdated: '2024-03-18', rowCount: null
    },
    {
      id: 27, name: 'vw_revenue_summary',
      qualifiedName: 'prod.e2e.vw_revenue_summary',
      objectType: 'View', domain: 'E2E Analytics', steward: 'Jane Smith',
      dataSource: 'Snowflake - Data Warehouse', schema: 'reporting',
      tags: ['Financial', 'Internal'], pillar: 'E2E',
      certificationStatus: 'Certified',
      description: 'Aggregated revenue summary by region, product family, and time period.',
      lastUpdated: '2024-03-10', rowCount: null
    },
    {
      id: 28, name: 'general_ledger',
      qualifiedName: 'prod.finance.general_ledger',
      objectType: 'Table', domain: 'Finance', steward: 'Sarah Johnson',
      dataSource: 'PostgreSQL - Finance', schema: 'finance',
      tags: ['Financial', 'Compliance', 'Sensitive'], pillar: 'E2E',
      certificationStatus: 'Certified',
      description: 'General ledger entries for all supply chain financial transactions.',
      lastUpdated: '2024-03-19', rowCount: 5600000
    },
    {
      id: 29, name: 'vw_monthly_close',
      qualifiedName: 'prod.finance.vw_monthly_close',
      objectType: 'View', domain: 'Finance', steward: 'Sarah Johnson',
      dataSource: 'Snowflake - Data Warehouse', schema: 'finance',
      tags: ['Financial', 'Compliance'], pillar: 'E2E',
      certificationStatus: 'Deprecated',
      description: 'Monthly financial close summary. Deprecated — use vw_close_v2 instead.',
      lastUpdated: '2023-06-01', rowCount: null
    },
    {
      id: 30, name: 'vw_supply_chain_kpis',
      qualifiedName: 'prod.e2e.vw_supply_chain_kpis',
      objectType: 'View', domain: 'E2E Analytics', steward: 'David Park',
      dataSource: 'Snowflake - Data Warehouse', schema: 'reporting',
      tags: ['Internal'], pillar: 'E2E',
      certificationStatus: 'Certified',
      description: 'Executive supply chain scorecard covering plan, source, make, deliver, and return KPIs.',
      lastUpdated: '2024-03-20', rowCount: null
    }
  ]
};
