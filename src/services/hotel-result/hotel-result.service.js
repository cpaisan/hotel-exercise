import axios from 'axios';

class HotelResultService {
  get() {
    return axios
      .get('https://homework-app.rocketmiles.com/fe-homework/rates')
      .then(response => response.data)
      .catch(() => {
        throw new Error();
      });
  }
}

const hotelResultService = new HotelResultService();

export default hotelResultService;
