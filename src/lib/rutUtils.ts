
export const validateRut = (rut: string): boolean => {
  if (!rut || rut.length < 2) return false;
  
  // Clean string (remove dots and dashes)
  const cleanRut = rut.replace(/\./g, "").replace(/-/g, "").toUpperCase();
  const dv = cleanRut.slice(-1);
  const body = cleanRut.slice(0, -1);
  
  if (body.length < 7 || isNaN(Number(body))) return false;
  
  let sum = 0;
  let multiplier = 2;
  
  for (let i = body.length - 1; i >= 0; i--) {
    sum += multiplier * Number(body[i]);
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }
  
  const expectedDv = 11 - (sum % 11);
  let dvChar = "";
  if (expectedDv === 11) dvChar = "0";
  else if (expectedDv === 10) dvChar = "K";
  else dvChar = expectedDv.toString();
  
  return dvChar === dv;
};

export const formatRut = (rut: string): string => {
  let value = rut.replace(/\./g, "").replace(/-/g, "");
  if (value.length <= 1) return value;
  
  const dv = value.slice(-1).toUpperCase();
  const body = value.slice(0, -1).replace(/\D/g, "");
  
  if (body === "") return dv;
  
  let result = "";
  for (let i = body.length - 1, j = 1; i >= 0; i--, j++) {
    result = body[i] + result;
    if (j % 3 === 0 && i !== 0) result = "." + result;
  }
  
  return `${result}-${dv}`;
};
