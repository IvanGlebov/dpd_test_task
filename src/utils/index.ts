function debounce(callback: () => void, delay: number) {
  let timer: string | number | NodeJS.Timeout | undefined = undefined;
  return (function () {
    clearInterval(timer);
    timer = setTimeout(() => callback(), delay);
  })();
}

export { debounce };
