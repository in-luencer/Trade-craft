import React, { useEffect, useRef, memo } from 'react';

interface TradingViewChartProps {
  symbol: string;
  interval: string;
  studies?: string[];
  theme?: 'light' | 'dark';
}

function TradingViewChart({ 
  symbol, 
  interval, 
  studies = [], 
  theme = 'dark' 
}: TradingViewChartProps) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;

    // Debug log
    console.log('TradingView Chart Props:', {
      symbol,
      interval,
      studies,
      theme
    });

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;

    const widgetConfig = {
      "autosize": true,
      "symbol": symbol,
      "interval": interval,
      "timezone": "Etc/UTC",
      "theme": theme,
      "style": "1",
      "locale": "en",
      "allow_symbol_change": true,
      "studies": studies,
      "support_host": "https://www.tradingview.com",
      "save_image": true,
      "hide_side_toolbar": false,
      "withdateranges": true,
      "hide_volume": false,
      "show_popup_button": true,
      "popup_width": "1000",
      "popup_height": "650",
      "studies_overrides": {},
      "overrides": {
        "mainSeriesProperties.candleStyle.upColor": "#26a69a",
        "mainSeriesProperties.candleStyle.downColor": "#ef5350",
        "mainSeriesProperties.candleStyle.borderUpColor": "#26a69a",
        "mainSeriesProperties.candleStyle.borderDownColor": "#ef5350",
        "mainSeriesProperties.candleStyle.wickUpColor": "#26a69a",
        "mainSeriesProperties.candleStyle.wickDownColor": "#ef5350"
      }
    };

    console.log('TradingView Widget Config:', widgetConfig);
    script.innerHTML = JSON.stringify(widgetConfig);

    // Clear previous widget if it exists
    while (container.current.firstChild) {
      container.current.removeChild(container.current.firstChild);
    }

    // Add the widget container
    const widgetContainer = document.createElement("div");
    widgetContainer.className = "tradingview-widget-container__widget";
    widgetContainer.style.height = "calc(100% - 32px)";
    widgetContainer.style.width = "100%";
    container.current.appendChild(widgetContainer);

    // Add the script
    container.current.appendChild(script);

    // Add the copyright
    const copyright = document.createElement("div");
    copyright.className = "tradingview-widget-copyright";
    copyright.innerHTML = '<a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span className="blue-text">Track all markets on TradingView</span></a>';
    container.current.appendChild(copyright);

    return () => {
      // Cleanup
      if (container.current) {
        while (container.current.firstChild) {
          container.current.removeChild(container.current.firstChild);
        }
      }
    };
  }, [symbol, interval, studies, theme]);

  return (
    <div 
      className="tradingview-widget-container" 
      ref={container} 
      style={{ height: "100%", width: "100%" }}
    />
  );
}

export default memo(TradingViewChart);