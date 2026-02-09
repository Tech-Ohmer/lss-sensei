export const calculateDPMO = (defects: number, totalUnits: number, opportunitiesPerUnit: number) => {
  if (totalUnits <= 0 || opportunitiesPerUnit <= 0) return 0;
  const dpmo = (defects / (totalUnits * opportunitiesPerUnit)) * 1000000;
  return Math.max(0, dpmo);
};

/**
 * Calculates the Sigma Level based on DPMO.
 * Uses a more precise approximation including the standard 1.5 sigma shift.
 */
export const getSigmaLevel = (dpmo: number) => {
  if (dpmo <= 0) return 6.0;
  
  // Convert DPMO to Yield
  const yieldVal = 1 - (dpmo / 1000000);
  
  if (yieldVal <= 0) return 0.0;
  if (yieldVal >= 0.9999966) return 6.0;

  // Simple but much more accurate linear-ish approximation for the range 1-6 sigma
  // Formula: Sigma = 0.8406 + SQRT(29.37 - 2.221 * LN(DPMO))
  // (Approximation valid for DPMO > 0)
  try {
    const lnDpmo = Math.log(dpmo);
    const sigma = 0.8406 + Math.sqrt(Math.max(0, 29.37 - 2.221 * lnDpmo));
    return parseFloat(sigma.toFixed(2));
  } catch (e) {
    return 1.0;
  }
};