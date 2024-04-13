const BASE_URL = 'https://evasun.us/secimadmin';

class ApiService {
  static async getSecimData(selectedIl) {
    try {
      const response = await fetch(`${BASE_URL}/api.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `selectedIl=${encodeURIComponent(selectedIl)}`,

      });

      if (!response.ok) {
        throw new Error('Network request failed');
      }
      
      const data = await response.json();

      return data;
    } catch (error) {
      throw new Error(`API error: ${error.message}`);
    }
  }

  static async oyVer(oyBilgileri) {
    try {
      const response = await fetch(`${BASE_URL}/oy_ver.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(oyBilgileri),
      });

      if (!response.ok) {
        throw new Error('Network request failed');
      }


      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      return data;
    } catch (error) {
      throw new Error(`API error: ${error.message}`);
    }
  }

   static async getOyDagilimi(selectedIl) {
    try {
      const response = await fetch(`${BASE_URL}/sonucsorgu.php?il=${selectedIl}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network request failed');
      }

      const data = await response.json();
      
      return data;
    } catch (error) {
      throw new Error(`API error: ${error.message}`);
    }
  }
  static async GetIPAdress(ipAddress) {
    try {
        const response = await fetch(`${BASE_URL}/check_vote.php?ip=${ipAddress}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network request failed');
        }
        const data = await response.json();
    
        return data;
      } catch (error) {
        throw new Error(`API error: ${error.message}`);
      }
    }
  
}

export default ApiService;


