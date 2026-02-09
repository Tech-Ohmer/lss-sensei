export const calculateDPMO = (defects: number, totalUnits: number, opportunitiesPerUnit: number) => {
  if (totalUnits === 0 || opportunitiesPerUnit === 0) return 0;
  return (defects / (totalUnits * opportunitiesPerUnit)) * 1000000;
};

export const getSigmaLevel = (dpmo: number) => {
  if (dpmo <= 0) return 6;
  // Approximation of Sigma Level based on DPMO (Yield to Z-score)
  // 3.4 DPMO = 6 Sigma
  // 233 DPMO = 5 Sigma
  // 6210 DPMO = 4 Sigma
  // 66807 DPMO = 3 Sigma
  // 308537 DPMO = 2 Sigma
  // 691462 DPMO = 1 Sigma
  if (dpmo <= 3.4) return 6;
  if (dpmo <= 233) return 5;
  if (dpmo <= 6210) return 4;
  if (dpmo <= 66807) return 3;
  if (dpmo <= 308537) return 2;
  return 1;
};
