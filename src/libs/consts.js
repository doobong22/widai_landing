const host = "https://domain.co.kr";

const exportData = {

  apiUrl: 'https://api.mingle.company',
  // apiUrl: 'http://211.223.88.86:10002',
  s3Url: 'https://api.mingle.company',
  downloadUrl: 'https://api.mingle.company/admin/download',
  socketUrl: 'https://ws.mingle.company',

  api_url: `${host}`, // VATA LIVE SERVER
  
  apiDelay: 200,
  pagerows: 100,

  toastOption: {
    isLoading: false, 
    autoClose: 2000,
    closeOnClick: true,
    pauseOnHover: false
  },
  toastErrorOption: {
    isLoading: false, 
    autoClose: 2000,
    closeOnClick: true,
    pauseOnHover: false,
    position: 'bottom-center'
  },
  imgAlt: 'MINGLE',

  lnbShow : [],
  lnvHide : [],
}

export default exportData;