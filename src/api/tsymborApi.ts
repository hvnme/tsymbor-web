const API_BASE_URL = "https://tsymbor.zina24.shop/api/webapp";

interface UserDto {
  barcode: string;
  balance: number;
  freeCoffeeCount: number;
  coffeeTillFree: number;
}

interface PromotionDTO {
  id: number;
  startDate: string;
  endDate: string;
  image: string;
  text: string;
}

interface PromotionCounterDTO {
  id: number;
  nameCounter: string;
  codeCounter: number;
  active: boolean;
  startAt: string;
  endAt: string;
  count?: number;
}

interface LabubuActivationResponse {
  success: boolean;
  number?: number;
  message?: string;
  error?: string;
}

interface LabubuStatusResponse {
  success: boolean;
  isUsed?: boolean;
  message?: string;
  error?: string;
}

interface LabubuStatsResponse {
  success: boolean;
  usedCount?: number;
  remainingCount?: number;
  totalNumbers?: number;
}

class TsymborApi {
  /**
   * Получить информацию о пользователе по chatId
   */
  async getUserInfo(chatId: number): Promise<UserDto | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/user/${chatId}`);

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching user info:", error);
      throw error;
    }
  }

  /**
   * Получить активные промоции
   */
  async getActivePromotions(): Promise<PromotionDTO[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/promotions`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching promotions:", error);
      throw error;
    }
  }

  /**
   * Получить активные счетчики промоций
   */
  async getActivePromotionCounters(): Promise<PromotionCounterDTO[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/promotion-counters/active`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching promotion counters:", error);
      throw error;
    }
  }

  /**
   * Активировать QR-код Labubu
   */
  async activateLabubu(
    chatId: number,
    qrValue: string
  ): Promise<LabubuActivationResponse> {
    try {
      const params = new URLSearchParams({
        chatId: chatId.toString(),
        value: qrValue,
      });

      const response = await fetch(`${API_BASE_URL}/labubu/activate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || "Помилка активації QR-коду",
        };
      }

      return data;
    } catch (error) {
      console.error("Error activating Labubu QR:", error);
      return {
        success: false,
        error: "Помилка мережі",
      };
    }
  }

  /**
   * Проверить статус QR-кода
   */
  async checkQRStatus(qrValue: string): Promise<LabubuStatusResponse> {
    try {
      const params = new URLSearchParams({
        value: qrValue,
      });

      const response = await fetch(`${API_BASE_URL}/labubu/check?${params}`);
      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || "Помилка перевірки QR-коду",
        };
      }

      return data;
    } catch (error) {
      console.error("Error checking QR status:", error);
      return {
        success: false,
        error: "Помилка мережі",
      };
    }
  }
}

export const tsymborApi = new TsymborApi();

export type {
  UserDto,
  PromotionDTO,
  PromotionCounterDTO,
  LabubuActivationResponse,
  LabubuStatusResponse,
  LabubuStatsResponse,
};
