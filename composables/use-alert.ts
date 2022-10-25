const useAlert = () => {
  const {$swal} = useNuxtApp();
  const errorAlert = (mess: string, res?: any) => {
    $swal.fire({
      title: 'Lỗi',
      text: mess,
      icon: 'error',
      confirmButtonText: 'Đóng',
      confirmButtonColor: 'red',
    }).then(() => {
      if(res) {
        res();
      }
    });
  };
  const successAlert = (mess: string,  res?: any) => {
    $swal.fire({
      title: 'Success!',
      text: mess,
      icon: 'success',
      confirmButtonText: 'Đóng',
      confirmButtonColor: 'rgb(87 188 129)',
    }).then(() => {
      if(res) {
        res();
      }
    });
  };
  return {errorAlert, successAlert};
};
export default useAlert;
