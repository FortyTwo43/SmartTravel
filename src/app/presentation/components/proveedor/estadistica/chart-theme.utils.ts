import type { TooltipComponentOption } from 'echarts';

export interface ChartThemeTokens {
  textColor: string;
  textMuted: string;
  primary: string;
  secondary: string;
  tertiary: string;
  negative: string;
  borderColor: string;
  bgSurface: string;
  fontHeadline: string;
  fontBody: string;
  lineHeight: number;
  letterSpacing: string;
  wordSpacing: string;
}

export function getChartThemeTokens(): ChartThemeTokens {
  const style = getComputedStyle(document.documentElement);

  return {
    textColor: style.getPropertyValue('--text-main').trim() || '#1F2937',
    textMuted: style.getPropertyValue('--text-muted').trim() || '#5F6B7A',
    primary: style.getPropertyValue('--color-primary').trim() || '#0288D1',
    secondary: style.getPropertyValue('--color-secondary').trim() || '#4CAF50',
    tertiary: style.getPropertyValue('--color-tertiary').trim() || '#C26C02',
    negative: style.getPropertyValue('--color-negative').trim() || '#f46e60',
    borderColor: style.getPropertyValue('--border-color').trim() || '#D1D5DB',
    bgSurface: style.getPropertyValue('--bg-surface').trim() || '#FFFFFF',
    fontHeadline: style.getPropertyValue('--font-headline').trim() || "'Plus Jakarta Sans', sans-serif",
    fontBody: style.getPropertyValue('--font-body').trim() || "'Inter', sans-serif",
    lineHeight: Number.parseFloat(style.getPropertyValue('--text-line-height').trim() || '1.5'),
    letterSpacing: style.getPropertyValue('--text-letter-spacing').trim() || '0em',
    wordSpacing: style.getPropertyValue('--text-word-spacing').trim() || '0em'
  };
}

export function getChartTextStyle(color?: string, fontSize = 12) {
  const tokens = getChartThemeTokens();

  return {
    color: color ?? tokens.textColor,
    fontFamily: tokens.fontBody,
    fontSize,
    lineHeight: Math.round(fontSize * tokens.lineHeight),
    letterSpacing: tokens.letterSpacing
  };
}

export function isMobileChartView(): boolean {
  return window.matchMedia('(max-width: 768px)').matches;
}

function getTooltipExtraCss(wrapOnMobile: boolean): string {
  const tokens = getChartThemeTokens();
  const spacingCss = [
    `line-height:${tokens.lineHeight}`,
    `letter-spacing:${tokens.letterSpacing}`,
    `word-spacing:${tokens.wordSpacing}`,
    `font-family:${tokens.fontBody}`
  ].join(';');

  if (wrapOnMobile && isMobileChartView()) {
    return `${spacingCss};max-width:10rem;white-space:normal;word-wrap:break-word;overflow-wrap:break-word;`;
  }

  return `${spacingCss};`;
}

export function getAxisTooltipConfig(): TooltipComponentOption {
  const tokens = getChartThemeTokens();

  return {
    trigger: 'axis',
    className: 'chart-tooltip',
    confine: true,
    textStyle: getChartTextStyle(undefined, 14),
    extraCssText: getTooltipExtraCss(false),
    borderColor: tokens.borderColor,
    backgroundColor: tokens.bgSurface
  };
}

export function getItemTooltipConfig(wrapOnMobile = false): TooltipComponentOption {
  const tokens = getChartThemeTokens();

  return {
    trigger: 'item',
    className: wrapOnMobile ? 'chart-tooltip chart-tooltip--wrap-mobile' : 'chart-tooltip',
    confine: true,
    textStyle: getChartTextStyle(undefined, 14),
    extraCssText: getTooltipExtraCss(wrapOnMobile),
    borderColor: tokens.borderColor,
    backgroundColor: tokens.bgSurface
  };
}

export function getPieLegendConfig() {
  const tokens = getChartThemeTokens();
  const isMobile = isMobileChartView();

  if (isMobile) {
    return {
      orient: 'horizontal' as const,
      left: 'center',
      bottom: 0,
      textStyle: getChartTextStyle(tokens.textColor, 12),
      borderWidth: 0,
      borderColor: 'transparent',
      itemGap: 12
    };
  }

  return {
    orient: 'vertical' as const,
    left: 'left',
    top: 'middle',
    textStyle: getChartTextStyle(tokens.textColor, 12),
    borderWidth: 0,
    borderColor: 'transparent'
  };
}

export function getDonutLegendConfig() {
  const tokens = getChartThemeTokens();

  return {
    top: 'bottom',
    textStyle: getChartTextStyle(tokens.textColor, 12),
    borderWidth: 0,
    borderColor: 'transparent',
    itemGap: 16
  };
}

export function getAxisLineStyle() {
  const tokens = getChartThemeTokens();

  return {
    lineStyle: {
      color: tokens.borderColor,
      width: 1
    }
  };
}
