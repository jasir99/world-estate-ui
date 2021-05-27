import axios from 'axios';

export const postRequest = (coords, description, address, images) => {
  console.log(coords, address);
  coords.lat = parseFloat(coords.lat.toFixed(7));
  coords.lng = parseFloat(coords.lng.toFixed(7));
  axios
    .post('https://advert-app.herokuapp.com/api/v1/address/', {
      lat: coords.lat,
      lng: coords.lng,
      description: description,
      address: address,
    })
    .then((res) => {
      console.log(res);
      if (images.length === 0) return { status: true, msg: res.msg };
      else {
        for (let i = 0; i < images.length; i++) {
          let formData = new FormData();
          if (i === 20) break;
          formData.append('image', images[i]);
          formData.append('propertyAddress', res.data.id);
          axios
            .post('https://advert-app.herokuapp.com/api/v1/images/', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            })
            .then((res) => {
              console.log(res);
            })
            .catch((error) => console.log(error));
        }
      }
    });
};
