require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';

app.use(cors());
app.use(express.json());

// ── Auth Middleware ──
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// ══════════════════════════════════════════
// PUBLIC ROUTES
// ══════════════════════════════════════════

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Get app settings (public)
app.get('/api/settings', async (req, res) => {
  try {
    const settings = await prisma.appSetting.findMany();
    const config = settings.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});
    res.json(config);
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.json({});
  }
});

// Submit citizen registration
app.post('/api/citizens', async (req, res) => {
  try {
    const { qrCodeId, name, fatherName, dob, gender, mobileNumber, aadhaarNumber, address, cityVillage, state, district, pinCode, incomeVariant, campId, schemes } = req.body;
    if (!name || !mobileNumber || !state) {
      return res.status(400).json({ error: 'Name, mobile number, and state are required.' });
    }
    const citizen = await prisma.citizen.create({
      data: {
        qrCodeId: qrCodeId || `QR-${Date.now()}`,
        name,
        fatherName: fatherName || '',
        dob: dob || '',
        gender: gender || '',
        mobileNumber,
        aadhaarNumber: aadhaarNumber || '',
        address: address || '',
        cityVillage: cityVillage || '',
        state,
        district: district || '',
        pinCode: pinCode || '',
        incomeVariant: incomeVariant || '',
        campId: campId || 'WALK-IN',
        schemes: schemes || ''
      }
    });
    res.status(201).json({ success: true, citizenId: citizen.id, qrCodeId: citizen.qrCodeId });
  } catch (error) {
    console.error('Error creating citizen:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Submit contact form
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, mobile, issueType, message } = req.body;
    if (!name || !message) {
      return res.status(400).json({ error: 'Name and message are required.' });
    }
    const msg = await prisma.contactMessage.create({
      data: { name, email: email || '', mobile: mobile || '', issueType: issueType || 'Other', message }
    });
    res.status(201).json({ success: true, id: msg.id });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get schemes list (static, Modiji ka ATM)
app.get('/api/schemes', (req, res) => {
  res.json([
    { id: 1, name: "PM-KISAN Samman Nidhi", ministry: "Ministry of Agriculture", year: 2019, description: "Direct cash transfer of ₹6,000 per year to all farmer families. Modiji ka ATM for rural prosperity.", eligibility: ["Small and marginal farmers", "Valid land records", "Indian citizen"], benefits: ["₹6,000 per year in 3 installments", "Direct bank transfer", "No intermediaries"], beneficiaries: "10 Cr+" },
    { id: 2, name: "Pradhan Mantri Awas Yojana (PMAY)", ministry: "Ministry of Housing", year: 2015, description: "Highly visible physical asset — houses for poor & lower-income households.", eligibility: ["EWS/LIG households", "No pucca house", "First-time buyers"], benefits: ["Up to ₹2.67 lakh subsidy", "Interest rate subsidy", "Women co-ownership"], beneficiaries: "3 Cr+" },
    { id: 3, name: "Jal Jeevan Mission", ministry: "Ministry of Jal Shakti", year: 2019, description: "Nal se Jal. Water infrastructure and women-centric welfare for rural households.", eligibility: ["Rural households", "Gram Panchayat approved"], benefits: ["Functional household tap connection", "Clean drinking water"], beneficiaries: "14 Cr+" },
    { id: 4, name: "Ayushman Bharat – PM-JAY", ministry: "Ministry of Health", year: 2018, description: "Direct healthcare benefit providing ₹5 lakh coverage per vulnerable family.", eligibility: ["BPL families", "SECC database listed"], benefits: ["₹5 lakh health coverage", "Cashless treatment", "1,500+ procedures covered"], beneficiaries: "34 Cr+" },
    { id: 5, name: "PM Ujjwala Yojana", ministry: "Ministry of Petroleum", year: 2016, description: "LPG connections to women of poor households for clean cooking fuel.", eligibility: ["BPL household", "Adult woman applicant", "No existing LPG connection"], benefits: ["Free LPG connection", "₹1,600 subsidy", "EMI for stove"], beneficiaries: "10 Cr+" },
    { id: 6, name: "Swachh Bharat Mission", ministry: "Ministry of Drinking Water", year: 2014, description: "Toilets, sanitation, Open Defecation Free (ODF), and waste management for all.", eligibility: ["Households without toilets"], benefits: ["Financial assistance for toilet construction", "Improved sanitation"], beneficiaries: "11 Cr+" },
    { id: 7, name: "PM SVANidhi", ministry: "Ministry of Housing", year: 2020, description: "Urban poor credit & digital payments support for street vendors and micro-entrepreneurs.", eligibility: ["Street vendors in urban areas", "Vending certificate"], benefits: ["Collateral-free working capital up to ₹10k/20k/50k", "Interest subsidy", "Cashback on digital payments"], beneficiaries: "50 Lakh+" }
  ]);
});

// ══════════════════════════════════════════
// AUTH ROUTES
// ══════════════════════════════════════════

app.post('/api/admin/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    let admin = await prisma.admin.findUnique({ where: { email } });

    // Auto-seed: if no admins exist at all, create the default superadmin
    if (!admin) {
      const adminCount = await prisma.admin.count();
      if (adminCount === 0 && email === 'superadmin@gov.in' && password === 'admin123') {
        const hashedPassword = await bcrypt.hash('admin123', 10);
        admin = await prisma.admin.create({
          data: {
            email: 'superadmin@gov.in',
            password: hashedPassword,
            role: 'SUPER_ADMIN',
            name: 'Super Admin',
          }
        });
        console.log('Auto-seeded default superadmin account.');
      }
    }

    if (!admin) return res.status(401).json({ error: 'Invalid credentials' });
    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: admin.id, role: admin.role, state: admin.state, campId: admin.campId }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, role: admin.role, state: admin.state });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ══════════════════════════════════════════
// PROTECTED ROUTES
// ══════════════════════════════════════════

// Update App Settings
app.post('/api/admin/settings', authenticateToken, async (req, res) => {
  try {
    const { key, value } = req.body;
    if (!key || value === undefined) return res.status(400).json({ error: 'Key and value are required.' });
    
    const setting = await prisma.appSetting.upsert({
      where: { key },
      update: { value },
      create: { key, value }
    });
    res.json({ success: true, setting });
  } catch (error) {
    console.error('Error updating setting:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get citizens with filters + pagination
app.get('/api/admin/citizens', authenticateToken, async (req, res) => {
  try {
    const { state, gender, scheme, search, dateFrom, dateTo, page = 1, limit = 20 } = req.query;
    let whereClause = {};

    // Role-based
    if (req.user.role === 'STATE_ADMIN' && req.user.state) whereClause.state = req.user.state;
    if (req.user.role === 'CAMP_ADMIN' && req.user.campId) whereClause.campId = req.user.campId;

    // Filters
    if (state && req.user.role === 'SUPER_ADMIN') whereClause.state = state;
    if (gender) whereClause.gender = gender;
    if (scheme) whereClause.schemes = { contains: scheme };
    if (search) {
      whereClause.OR = [
        { name: { contains: search } },
        { mobileNumber: { contains: search } },
        { qrCodeId: { contains: search } },
        { fatherName: { contains: search } }
      ];
    }
    if (dateFrom || dateTo) {
      whereClause.createdAt = {};
      if (dateFrom) whereClause.createdAt.gte = new Date(dateFrom);
      if (dateTo) whereClause.createdAt.lte = new Date(dateTo + 'T23:59:59.999Z');
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [citizens, total] = await Promise.all([
      prisma.citizen.findMany({ where: whereClause, orderBy: { createdAt: 'desc' }, skip, take: parseInt(limit) }),
      prisma.citizen.count({ where: whereClause })
    ]);

    res.json({ citizens, total, page: parseInt(page), totalPages: Math.ceil(total / parseInt(limit)) });
  } catch (error) {
    console.error('Error fetching citizens:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Dashboard analytics
app.get('/api/admin/analytics', authenticateToken, async (req, res) => {
  try {
    let whereClause = {};
    if (req.user.role === 'STATE_ADMIN' && req.user.state) whereClause.state = req.user.state;
    if (req.user.role === 'CAMP_ADMIN' && req.user.campId) whereClause.campId = req.user.campId;

    const total = await prisma.citizen.count({ where: whereClause });

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayCount = await prisma.citizen.count({ where: { ...whereClause, createdAt: { gte: today } } });

    const genderStats = await prisma.citizen.groupBy({ by: ['gender'], where: whereClause, _count: { gender: true } });
    const stateStats = await prisma.citizen.groupBy({ by: ['state'], where: whereClause, _count: { state: true }, orderBy: { _count: { state: 'desc' } }, take: 10 });

    res.json({ total, todayCount, byGender: genderStats, byState: stateStats });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// CSV export
app.get('/api/admin/citizens/export', authenticateToken, async (req, res) => {
  try {
    const { state, gender, scheme, search } = req.query;
    let whereClause = {};
    if (req.user.role === 'STATE_ADMIN' && req.user.state) whereClause.state = req.user.state;
    if (state && req.user.role === 'SUPER_ADMIN') whereClause.state = state;
    if (gender) whereClause.gender = gender;
    if (scheme) whereClause.schemes = { contains: scheme };
    if (search) {
      whereClause.OR = [
        { name: { contains: search } },
        { mobileNumber: { contains: search } },
        { qrCodeId: { contains: search } }
      ];
    }

    const citizens = await prisma.citizen.findMany({ where: whereClause, orderBy: { createdAt: 'desc' } });

    const headers = 'S.No,QR ID,Name,Father Name,DOB,Gender,Mobile,Aadhaar,Address,City/Village,State,District,Pin Code,Income Variant,Camp ID,Schemes,Registration Date\n';
    const rows = citizens.map((c, i) =>
      `${i + 1},"${c.qrCodeId}","${c.name}","${c.fatherName}","${c.dob}","${c.gender}","${c.mobileNumber}","${c.aadhaarNumber}","${c.address.replace(/"/g, '""')}","${c.cityVillage || ''}","${c.state}","${c.district}","${c.pinCode}","${c.incomeVariant || ''}","${c.campId}","${c.schemes}","${c.createdAt.toISOString().split('T')[0]}"`
    ).join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=citizens_export.csv');
    res.send(headers + rows);
  } catch (error) {
    console.error('CSV export error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ── Camp Management ──
app.get('/api/admin/camps', authenticateToken, async (req, res) => {
  try {
    const camps = await prisma.camp.findMany({ orderBy: { createdAt: 'desc' } });
    // Attach registration counts
    const campsWithCounts = await Promise.all(camps.map(async (camp) => {
      const count = await prisma.citizen.count({ where: { campId: camp.campId } });
      return { ...camp, registrations: count };
    }));
    res.json(campsWithCounts);
  } catch (error) {
    console.error('Error fetching camps:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/admin/camps', authenticateToken, async (req, res) => {
  try {
    const { campId, campName, state, district, coordinatorName, coordinatorMobile } = req.body;
    if (!campId || !campName || !state) return res.status(400).json({ error: 'Camp ID, name, and state are required.' });
    const camp = await prisma.camp.create({
      data: { campId, campName, state, district: district || '', coordinatorName: coordinatorName || '', coordinatorMobile: coordinatorMobile || '' }
    });
    res.status(201).json(camp);
  } catch (error) {
    if (error.code === 'P2002') return res.status(409).json({ error: 'Camp ID already exists.' });
    console.error('Error creating camp:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.patch('/api/admin/camps/:id', authenticateToken, async (req, res) => {
  try {
    const { status } = req.body;
    const camp = await prisma.camp.update({ where: { id: req.params.id }, data: { status } });
    res.json(camp);
  } catch (error) {
    console.error('Error updating camp status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/admin/camps/:id', authenticateToken, async (req, res) => {
  try {
    const { campId, campName, state, district, coordinatorName, coordinatorMobile, status } = req.body;
    const camp = await prisma.camp.update({
      where: { id: req.params.id },
      data: { campId, campName, state, district, coordinatorName, coordinatorMobile, status }
    });
    res.json(camp);
  } catch (error) {
    console.error('Error updating camp:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/api/admin/camps/:id', authenticateToken, async (req, res) => {
  try {
    await prisma.camp.delete({ where: { id: req.params.id } });
    res.json({ message: 'Camp deleted successfully' });
  } catch (error) {
    console.error('Error deleting camp:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ── Citizen CRUD ──
app.put('/api/admin/citizens/:id', authenticateToken, async (req, res) => {
  try {
    const data = req.body;
    const citizen = await prisma.citizen.update({
      where: { id: req.params.id },
      data
    });
    res.json(citizen);
  } catch (error) {
    console.error('Error updating citizen:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/api/admin/citizens/:id', authenticateToken, async (req, res) => {
  try {
    await prisma.citizen.delete({ where: { id: req.params.id } });
    res.json({ message: 'Citizen deleted successfully' });
  } catch (error) {
    console.error('Error deleting citizen:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});

module.exports = app;
