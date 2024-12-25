class TokenManager {
  private tokens: Record<string, any> = {};

  saveTokens(userId: string, accessToken: string, refreshToken: string, expiresIn: number) {
    this.tokens[userId] = {
      accessToken,
      refreshToken,
      expiresAt: Date.now() + expiresIn * 1000,
    };
  }

  getAccessToken(userId: string): string | null {
    const tokenData = this.tokens[userId];
    if (tokenData && tokenData.expiresAt > Date.now()) {
      return tokenData.accessToken;
    }
    return null;
  }

  getRefreshToken(userId: string): string | null {
    return this.tokens[userId]?.refreshToken || null;
  }

  async refreshAccessToken(userId: string): Promise<string | null> {
    const refreshToken = this.getRefreshToken(userId);
    if (!refreshToken) return null;

    try {
      const response = await fetch('https://www.meta.com/oauth/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
          client_id: process.env.META_CLIENT_ID,
          client_secret: process.env.META_CLIENT_SECRET,
        }),
      });

      const data = await response.json();
      this.saveTokens(userId, data.access_token, refreshToken, data.expires_in);
      return data.access_token;
    } catch (error) {
      console.error('Error refreshing token:', error);
      return null;
    }
  }
}

export const tokenManager = new TokenManager();
