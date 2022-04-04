import d3Tip from 'd3-tip';

const DEFAULT_CLASSNAME = 'd3-tip';

export const createTip = ({ className = DEFAULT_CLASSNAME, htmlTemplate }) => {
  const tip = d3Tip()
    .attr('class', className)
    .offset([0, 0])
    .html(htmlTemplate);

  return tip;
};
