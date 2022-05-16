const COLORS = ["#0D6EFD", "#6610F2", "#DC3545", "#FFC107", "#20C997", "#FD7E14", "#198754"];

function getColor(i) {
  return COLORS[i % COLORS.length];
}

export default getColor;
