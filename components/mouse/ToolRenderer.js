"use client";

import ClickTest from './ClickTest';
import DoubleClickTest from './DoubleClickTest';
import CpsTest from './CpsTest';
import ScrollTest from './ScrollTest';
import PollingRateTest from './PollingRateTest';

const components = { ClickTest, DoubleClickTest, CpsTest, ScrollTest, PollingRateTest };

export default function ToolRenderer({ component, locale, content }) {
    const Tool = components[component];
    if (!Tool) return null;

    return <Tool locale={locale} content={content} />;
}
