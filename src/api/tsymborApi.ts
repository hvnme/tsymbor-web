const API_BASE_URL = "https://tsymbor.zina24.shop/api/webapp";

interface UserDto {
  barcode: string;
  balance: number;
  promotionCounters: PromotionCounterDTO[];
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
  nameCounter: string;
  valueCounter: number;
}


class TsymborApi {
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

}

export const tsymborApi = new TsymborApi();

export type {
  UserDto,
  PromotionDTO,
  PromotionCounterDTO,
};
