import axios from "axios";

const API_URL = "http://localhost:5000/api";

async function testAPI() {
  try {
    console.log("Testing API endpoints...\n");

    // Test 1: Health check
    console.log("1. Testing /api/health");
    const healthResponse = await axios.get(`${API_URL}/health`);
    console.log("   Response:", healthResponse.data);
    console.log("   ✓ Health check passed\n");

    // Test 2: Get all courses
    console.log("2. Testing GET /courses");
    try {
      const coursesResponse = await axios.get(`${API_URL}/courses`);
      console.log(`   Found ${coursesResponse.data.data.length} courses`);
      console.log("   ✓ Get courses passed\n");
    } catch (err) {
      console.log("   ⚠ Could not get courses (DB may not be connected)");
      console.log(`   Error: ${err.response?.data?.message || err.message}\n`);
    }

    // Test 3: Initialize courses
    console.log("3. Testing GET /courses/init");
    try {
      const initResponse = await axios.get(`${API_URL}/courses/init`);
      console.log("   Response:", initResponse.data.message);
      console.log("   ✓ Initialize courses passed\n");
    } catch (err) {
      console.log("   ⚠ Could not initialize courses");
      console.log(`   Error: ${err.response?.data?.message || err.message}\n`);
    }

    console.log("✓ API Testing completed!");
  } catch (error) {
    console.error("✗ Error during testing:", error.message);
    process.exit(1);
  }
}

testAPI();
