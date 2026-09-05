const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('admin123', 10);

  // ── Admin ──
  await prisma.admin.upsert({
    where: { email: 'superadmin@gov.in' },
    update: {},
    create: { email: 'superadmin@gov.in', password, role: 'SUPER_ADMIN' },
  });
  console.log('✅ Super Admin created');

  // ── Camps ──
  const camps = [
    { campId: 'UP-LKO-01', campName: 'Lucknow Central Camp', state: 'Uttar Pradesh', district: 'Lucknow', coordinatorName: 'Rajesh Kumar', coordinatorMobile: '9876543210' },
    { campId: 'GJ-AMD-01', campName: 'Ahmedabad Mega Camp', state: 'Gujarat', district: 'Ahmedabad', coordinatorName: 'Priya Patel', coordinatorMobile: '9876543211' },
    { campId: 'RJ-JAI-01', campName: 'Jaipur Registration Camp', state: 'Rajasthan', district: 'Jaipur', coordinatorName: 'Amit Singh', coordinatorMobile: '9876543212' },
    { campId: 'UK-DEH-01', campName: 'Dehradun Seva Camp', state: 'Uttarakhand', district: 'Dehradun', coordinatorName: 'Sunita Sharma', coordinatorMobile: '9876543213' },
    { campId: 'PB-LDH-01', campName: 'Ludhiana Central Camp', state: 'Punjab', district: 'Ludhiana', coordinatorName: 'Harpreet Singh', coordinatorMobile: '9876543214' },
  ];

  for (const camp of camps) {
    await prisma.camp.upsert({ where: { campId: camp.campId }, update: {}, create: camp });
  }
  console.log('✅ 5 Camps created');

  // ── Citizens ──
  const citizenData = [
    { name: 'Rahul Sharma', fatherName: 'Suresh Sharma', dob: '1990-05-15', gender: 'Male', mobileNumber: '9111222333', aadhaarNumber: '123456789012', address: 'B-12, Hazratganj', cityVillage: 'Lucknow', state: 'Uttar Pradesh', district: 'Lucknow', pinCode: '226001', incomeVariant: '2-5 lakh', campId: 'UP-LKO-01', schemes: 'PM-KISAN Samman Nidhi, Ayushman Bharat – PM-JAY' },
    { name: 'Priya Singh', fatherName: 'Ram Singh', dob: '1985-08-22', gender: 'Female', mobileNumber: '9222333444', aadhaarNumber: '234567890123', address: '45, Civil Lines', cityVillage: 'Lucknow', state: 'Uttar Pradesh', district: 'Lucknow', pinCode: '226001', incomeVariant: '0-2 lakh', campId: 'UP-LKO-01', schemes: 'PM Ujjwala Yojana, Jal Jeevan Mission' },
    { name: 'Amit Patel', fatherName: 'Ramesh Patel', dob: '1992-01-10', gender: 'Male', mobileNumber: '9333444555', aadhaarNumber: '345678901234', address: 'Navrangpura', cityVillage: 'Ahmedabad', state: 'Gujarat', district: 'Ahmedabad', pinCode: '380009', incomeVariant: '5-10 lakh', campId: 'GJ-AMD-01', schemes: 'PM SVANidhi, Pradhan Mantri Awas Yojana (PMAY)' },
    { name: 'Meena Devi', fatherName: 'Gopal Prasad', dob: '1978-12-05', gender: 'Female', mobileNumber: '9444555666', aadhaarNumber: '456789012345', address: 'Satellite Road', cityVillage: 'Ahmedabad', state: 'Gujarat', district: 'Ahmedabad', pinCode: '380015', incomeVariant: '0-2 lakh', campId: 'GJ-AMD-01', schemes: 'Ayushman Bharat – PM-JAY, PM Ujjwala Yojana' },
    { name: 'Sanjay Rathore', fatherName: 'Vikas Rathore', dob: '1988-03-18', gender: 'Male', mobileNumber: '9555666777', aadhaarNumber: '567890123456', address: 'Malviya Nagar', cityVillage: 'Jaipur', state: 'Rajasthan', district: 'Jaipur', pinCode: '302017', incomeVariant: '2-5 lakh', campId: 'RJ-JAI-01', schemes: 'Jal Jeevan Mission, PM-KISAN Samman Nidhi' },
    { name: 'Kavita Sharma', fatherName: 'Prakash Sharma', dob: '1995-07-30', gender: 'Female', mobileNumber: '9666777888', aadhaarNumber: '678901234567', address: 'Mansarovar', cityVillage: 'Jaipur', state: 'Rajasthan', district: 'Jaipur', pinCode: '302020', incomeVariant: '0-2 lakh', campId: 'RJ-JAI-01', schemes: 'Pradhan Mantri Awas Yojana (PMAY)' },
    { name: 'Ravi Bisht', fatherName: 'Mohan Bisht', dob: '1982-09-25', gender: 'Male', mobileNumber: '9777888999', aadhaarNumber: '789012345678', address: 'Rajpur Road', cityVillage: 'Dehradun', state: 'Uttarakhand', district: 'Dehradun', pinCode: '248001', incomeVariant: '2-5 lakh', campId: 'UK-DEH-01', schemes: 'PM-KISAN Samman Nidhi, Swachh Bharat Mission' },
    { name: 'Sunita Rawat', fatherName: 'Dinesh Rawat', dob: '1991-11-14', gender: 'Female', mobileNumber: '9888999000', aadhaarNumber: '890123456789', address: 'Prem Nagar', cityVillage: 'Dehradun', state: 'Uttarakhand', district: 'Dehradun', pinCode: '248007', incomeVariant: '0-2 lakh', campId: 'UK-DEH-01', schemes: 'PM Ujjwala Yojana, Ayushman Bharat – PM-JAY' },
    { name: 'Gurpreet Singh', fatherName: 'Ashok Singh', dob: '1987-04-08', gender: 'Male', mobileNumber: '9999000111', aadhaarNumber: '901234567890', address: 'Model Town', cityVillage: 'Ludhiana', state: 'Punjab', district: 'Ludhiana', pinCode: '141002', incomeVariant: 'above 10 lakh', campId: 'PB-LDH-01', schemes: 'PM-KISAN Samman Nidhi' },
    { name: 'Manjit Kaur', fatherName: 'Rajendra Singh', dob: '1993-06-20', gender: 'Female', mobileNumber: '8111222333', aadhaarNumber: '012345678901', address: 'Sarabha Nagar', cityVillage: 'Ludhiana', state: 'Punjab', district: 'Ludhiana', pinCode: '141001', incomeVariant: '5-10 lakh', campId: 'PB-LDH-01', schemes: 'Ayushman Bharat – PM-JAY, Pradhan Mantri Awas Yojana (PMAY)' },
  ];

  for (const c of citizenData) {
    await prisma.citizen.create({ data: { ...c, qrCodeId: `QR-${Math.floor(Math.random() * 100000)}` } });
  }
  console.log('✅ 10 Citizens created');

  console.log('\n🎉 Seed complete!');
  console.log('Login: superadmin@gov.in / admin123');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
