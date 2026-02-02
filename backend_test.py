import requests
import sys
import json
from datetime import datetime, timedelta

class LawFirmAPITester:
    def __init__(self, base_url="https://prague-law-firm.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.consultation_id = None
        self.contact_id = None

    def run_test(self, name, method, endpoint, expected_status, data=None, params=None):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, params=params)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers)
            elif method == 'PATCH':
                response = requests.patch(url, json=data, headers=headers)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"   Response: {json.dumps(response_data, indent=2)[:200]}...")
                    return True, response_data
                except:
                    return True, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    error_data = response.json()
                    print(f"   Error: {error_data}")
                except:
                    print(f"   Error: {response.text}")
                return False, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_root_endpoint(self):
        """Test API root endpoint"""
        return self.run_test("API Root", "GET", "", 200)

    def test_create_consultation(self):
        """Test consultation creation"""
        consultation_data = {
            "name": "Test User",
            "email": "test@example.com",
            "phone": "+420123456789",
            "service": "corporate",
            "preferred_date": (datetime.now() + timedelta(days=7)).strftime('%Y-%m-%d'),
            "preferred_time": "10:00",
            "message": "Test consultation booking",
            "language": "en"
        }
        
        success, response = self.run_test(
            "Create Consultation",
            "POST",
            "consultations",
            200,
            data=consultation_data
        )
        
        if success and 'id' in response:
            self.consultation_id = response['id']
            print(f"   Created consultation ID: {self.consultation_id}")
        
        return success

    def test_get_consultations(self):
        """Test getting all consultations"""
        return self.run_test("Get All Consultations", "GET", "consultations", 200)

    def test_get_consultation_by_id(self):
        """Test getting specific consultation"""
        if not self.consultation_id:
            print("❌ Skipping - No consultation ID available")
            return False
            
        return self.run_test(
            "Get Consultation by ID",
            "GET",
            f"consultations/{self.consultation_id}",
            200
        )

    def test_update_consultation_status(self):
        """Test updating consultation status"""
        if not self.consultation_id:
            print("❌ Skipping - No consultation ID available")
            return False
            
        return self.run_test(
            "Update Consultation Status",
            "PATCH",
            f"consultations/{self.consultation_id}/status",
            200,
            params={"status": "confirmed"}
        )

    def test_create_contact_message(self):
        """Test contact message creation"""
        contact_data = {
            "name": "Test Contact",
            "email": "contact@example.com",
            "phone": "+420987654321",
            "subject": "Test Subject",
            "message": "This is a test contact message",
            "language": "cs"
        }
        
        success, response = self.run_test(
            "Create Contact Message",
            "POST",
            "contacts",
            200,
            data=contact_data
        )
        
        if success and 'id' in response:
            self.contact_id = response['id']
            print(f"   Created contact ID: {self.contact_id}")
        
        return success

    def test_get_contact_messages(self):
        """Test getting all contact messages"""
        return self.run_test("Get All Contact Messages", "GET", "contacts", 200)

    def test_get_available_slots(self):
        """Test getting available time slots"""
        test_date = (datetime.now() + timedelta(days=5)).strftime('%Y-%m-%d')
        return self.run_test(
            "Get Available Slots",
            "GET",
            "available-slots",
            200,
            params={"date": test_date}
        )

    def test_seed_blog_posts(self):
        """Test seeding blog posts"""
        return self.run_test("Seed Blog Posts", "POST", "seed-blog", 200)

    def test_get_blog_posts(self):
        """Test getting blog posts"""
        return self.run_test("Get Blog Posts", "GET", "blog", 200)

    def test_create_blog_post(self):
        """Test creating a blog post"""
        blog_data = {
            "title_cs": "Test článek",
            "title_ru": "Тестовая статья",
            "title_en": "Test Article",
            "excerpt_cs": "Testovací výtah článku",
            "excerpt_ru": "Тестовая выдержка статьи",
            "excerpt_en": "Test article excerpt",
            "content_cs": "Obsah testovacího článku v češtině",
            "content_ru": "Содержание тестовой статьи на русском",
            "content_en": "Test article content in English",
            "author": "Test Author",
            "category": "test",
            "image_url": "https://example.com/test.jpg",
            "tags": ["test", "api"]
        }
        
        return self.run_test(
            "Create Blog Post",
            "POST",
            "blog",
            200,
            data=blog_data
        )

def main():
    print("🚀 Starting Law Firm API Tests...")
    print("=" * 50)
    
    tester = LawFirmAPITester()
    
    # Test sequence
    tests = [
        tester.test_root_endpoint,
        tester.test_seed_blog_posts,
        tester.test_get_blog_posts,
        tester.test_create_blog_post,
        tester.test_create_consultation,
        tester.test_get_consultations,
        tester.test_get_consultation_by_id,
        tester.test_update_consultation_status,
        tester.test_create_contact_message,
        tester.test_get_contact_messages,
        tester.test_get_available_slots,
    ]
    
    # Run all tests
    for test in tests:
        try:
            test()
        except Exception as e:
            print(f"❌ Test failed with exception: {str(e)}")
    
    # Print results
    print("\n" + "=" * 50)
    print(f"📊 Test Results: {tester.tests_passed}/{tester.tests_run} passed")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All tests passed!")
        return 0
    else:
        print("⚠️  Some tests failed!")
        return 1

if __name__ == "__main__":
    sys.exit(main())