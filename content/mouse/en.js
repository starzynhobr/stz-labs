export const hub = {
    title: 'Online Mouse Test — Click, Double Click, Scroll and Polling Rate | STZ Labs',
    description: 'Free browser tools to test your mouse: click response, unintended double clicks, CPS, scroll wheel and polling rate. Nothing to install.',
    h1: 'Online mouse test',
    badge: 'Free tools',
    intro: 'Five tests that run straight in your browser, with nothing to install and no data leaving your machine. Pick what you need to diagnose: clicks that never register, double clicks that fire on their own, click speed, scroll wheel behaviour or sensor polling rate.',
    toolsHeading: 'Pick a test',
    noteHeading: 'Before you start',
    noteBody: 'Every test needs a physical mouse — trackpads and touchscreens emit different events, so their results are not usable for diagnosis. On a wireless mouse, test with the battery charged: a weak battery drops clicks in a way that looks exactly like a failing switch.',
};

export const toolLabels = {
    click: 'Click test',
    'double-click': 'Double click',
    cps: 'CPS',
    scroll: 'Scroll',
    'polling-rate': 'Polling rate',
};

export const ui = {
    relatedHeading: 'Related tools',
    faqHeading: 'Frequently asked questions',
    productHeading: 'From STZ Labs',
    clearHistory: 'Clear history',
    historyHeading: 'History',
    historyEmpty: 'No saved results yet.',
    noMouseWarning: 'This test requires a physical mouse. Trackpads and touchscreens produce different events.',
    reset: 'Reset',
    start: 'Start',
    stop: 'Stop',
};

export const tools = {
    click: {
        title: 'Mouse Click Test Online — Left, Right and Middle Button | STZ Labs',
        description: 'Check whether every mouse button registers clicks correctly. See the interval between clicks and spot buttons that drop or repeat input.',
        h1: 'Mouse click test',
        intro: 'Click inside the area below with each mouse button. The panel records which button fired, the interval since the previous click, and builds a full history — handy when you need proof that a button is failing.',
        areaTitle: 'Test area',
        areaSubtitle: 'Click using any mouse button',
        sections: [
            {
                heading: 'How to tell a mouse button is failing',
                body: 'The usual symptom is not a dead button but an unreliable one: you click, nothing happens, you click again and it works. In the test above that shows up as clicks you made that never reached the list. Click twenty times while counting out loud, then compare with the recorded total. A lower count means the switch is losing contact.\n\nAnother sign is a click that releases mid-drag. If selecting text or dragging a file breaks halfway, the switch is dropping contact under sustained pressure — a different fault from double clicking, and usually further along.',
            },
            {
                heading: 'Hardware, driver or software?',
                body: 'Before opening anything, isolate the cause. Try a different USB port, ideally a rear one wired straight to the motherboard, with no hub in between. Unpowered hubs are a common source of click failures on RGB mice, which draw more current.\n\nThen try the same mouse on another computer. If the fault follows the mouse, it is hardware. If it stays with the machine, suspect the driver or the vendor software — a badly configured macro profile will happily swallow legitimate clicks. Testing with the vendor software closed is worth it too, since remapping layers act before the browser ever sees the event.',
            },
            {
                heading: 'What this test cannot detect',
                body: 'The browser receives events already processed by the operating system, so some problems stay invisible here. Real click latency, for instance, depends on the whole path from switch to screen, while we only measure the gap between events that did arrive.\n\nSensor faults — a cursor that jitters, jumps or stalls — will not show up in a click test either. The polling rate test gives a better picture there, since it measures how regularly the mouse reports movement.',
            },
        ],
        faq: [
            {
                q: 'Why is the middle click not detected?',
                a: 'Some browsers claim the middle button for opening links in a new tab or for autoscroll, intercepting it before the page. The test blocks that inside the test area, but if the click still never appears, try outside the browser to confirm the button responds at all.',
            },
            {
                q: 'Does this work with a wireless mouse?',
                a: 'It does, but test with a charged battery. Low battery causes packet loss between mouse and receiver, and the symptom is identical to a faulty switch: clicks that vanish. If you can, repeat the test wired.',
            },
            {
                q: 'How many clicks do I need for a reliable result?',
                a: 'Fifty clicks per button is a reasonable sample. Switch failures are intermittent by nature, so a handful of clicks may miss the problem entirely. If you suspect one specific button, hammer that one.',
            },
            {
                q: 'Does the site record my clicks?',
                a: 'No. Everything runs in your browser and nothing is sent to any server. Closing the tab discards it all.',
            },
        ],
    },

    'double-click': {
        title: 'Mouse Double Click Test — Detect Unintended Double Clicks | STZ Labs',
        description: 'Find out whether your mouse is double clicking on its own. The test measures the gap between clicks and flags repeats below the human threshold.',
        h1: 'Unintended double click test',
        intro: 'A worn switch registers two clicks where you made one. Click slowly in the area below, one click at a time, leaving at least a second between them. Any pair below the chosen threshold gets flagged — nobody clicks twice within 80 milliseconds by accident.',
        areaTitle: 'Test area',
        areaSubtitle: 'Make single, well spaced clicks',
        sections: [
            {
                heading: 'Why switches start double clicking',
                body: 'Inside every switch a metal leaf meets a contact when you press. Over time that leaf loses tension and starts bouncing against the contact instead of landing cleanly. Each bounce is an electrical pulse, and the mouse reads every pulse as a click.\n\nOxidation speeds this up. Humidity and the natural oils from your hand leave a thin film on the contact, raising resistance and making the signal unstable. That is why the left button usually goes first — it takes far more use — and why the problem is more common in coastal, humid regions.',
            },
            {
                heading: 'What debounce time is, and how it hides the problem',
                body: 'Debounce is the window during which the mouse ignores new pulses after registering a click. It exists precisely to filter the switch bounce, and ships at somewhere between 8 and 12 milliseconds.\n\nMany vendors let you raise it in software — Razer, Logitech and Corsair all expose the setting. Pushing it to 20 or 30 ms usually clears an early double click. But be clear about what happened: you did not repair the switch, you told the mouse to ignore the symptom. The wear continues, and eventually the debounce needed to mask it starts eating legitimate fast clicks. It is a stopgap, and a good one, as long as you know it is temporary.',
            },
            {
                heading: 'Replace the switch or the mouse?',
                body: 'Replacing the switch makes sense when the mouse is good and everything else is intact. A single switch costs very little, and models with socketed switches can be swapped without soldering. The rest need desoldering, which calls for an iron, a solder sucker and some practice — not hard, but not the ideal first project either.\n\nReplacing the whole mouse makes more sense when other end-of-life signs are stacking up: a flaky cable near the strain relief, worn skates, a failing sensor, or rubberised coating starting to go sticky. If double clicking arrives alongside two or three of those, the switch is simply the first part to give.\n\nBefore anything else, check the warranty. Double clicking on a mouse under two years old is a recognised manufacturing defect, and several brands replace it without argument.',
            },
        ],
        faq: [
            {
                q: 'Which interval means the switch is faulty?',
                a: 'Below 80 milliseconds it is almost certainly the mouse repeating itself — the human floor for two deliberate clicks sits around 100 ms, and even that takes effort. Anything from 80 to 150 ms is suspicious and worth retesting with slower clicks.',
            },
            {
                q: 'Does raising debounce fix it permanently?',
                a: 'No. It fixes the symptom while the wear is mild. The switch keeps degrading and the value you need climbs until it interferes with legitimate fast clicks. Treat it as a way to buy time before a replacement.',
            },
            {
                q: 'Does cleaning the switch with contact cleaner work?',
                a: 'It works when oxidation is the cause, and can buy months of use. It does nothing once the leaf has lost mechanical tension. Since it is cheap and reversible, it is usually worth trying before you reach for a soldering iron.',
            },
            {
                q: 'Can double clicking be a software problem?',
                a: 'Rarely, but yes. Badly configured macros and remapping tools can duplicate clicks. If the test flags repeats, close the vendor software and try again. If the problem disappears, it was configuration, not hardware.',
            },
        ],
    },

    cps: {
        title: 'CPS Test — Measure Your Clicks Per Second Online | STZ Labs',
        description: 'Measure how many clicks per second you can reach. Pick a duration, watch the live average and compare against your previous attempts.',
        h1: 'CPS test (clicks per second)',
        intro: 'Pick a duration, click as fast as you can and see your average. The timer starts on your first click, so nothing is lost at the start.',
        areaTitle: 'Test area',
        areaSubtitle: 'The timer starts on your first click',
        sections: [
            {
                heading: 'What counts as a normal CPS',
                body: 'Clicking normally with one finger, most people land between 4 and 7 clicks per second. Between 7 and 10 suggests deliberate practice. Consistently above 10 almost always involves a technique.\n\nThe number also depends on the mouse. Light switches with short travel favour a high cadence, and a high debounce value imposes an artificial ceiling: if the mouse ignores pulses for 20 ms, you cannot exceed 50 clicks per second by definition.',
            },
            {
                heading: 'Jitter, butterfly and drag clicking',
                body: 'Jitter clicking tenses the forearm to produce controlled tremor that carries into the finger. It clears 10 CPS easily and carries the highest injury risk — it is sustained muscle tension across a small joint.\n\nButterfly clicking alternates two fingers on the same button, roughly doubling the cadence. It is kinder on the body but needs a switch that accepts very closely spaced actuations, and it runs straight into the debounce limit.\n\nDrag clicking drags a finger across the button surface, using friction to trigger many actuations. It reaches extreme numbers, wears the switch quickly, and counts as cheating on many game servers.',
            },
            {
                heading: 'The injury risk is real',
                body: 'Tendinitis and carpal tunnel syndrome do not come from one test session; they come from sustained repetition with the wrist in a poor position. Jitter clicking is especially risky because the technique is built on holding tension.\n\nIf you feel tingling, wrist pain or weakness gripping objects, stop. Those point to nerve compression and do not improve by pushing through. No CPS record is worth an injury that makes typing hurt.',
            },
        ],
        faq: [
            {
                q: 'Which duration should I use?',
                a: 'Five seconds is the common standard and the best balance: long enough to dilute a lucky start, short enough to hold your peak. Thirty or sixty second runs measure stamina rather than speed, and the average drops noticeably.',
            },
            {
                q: 'Why is my CPS lower here than on another site?',
                a: 'Counting methods differ. Some sites start the clock before your first click, which inflates the average; others count press and release as two events. Here the timer starts on the first click and only presses count.',
            },
            {
                q: 'Will a better mouse raise my CPS?',
                a: 'Up to a point. A light switch, short travel and low debounce remove physical barriers, but the ceiling is still you. Tuning debounce in software usually pays off more than buying a new mouse.',
            },
            {
                q: 'Are my results saved?',
                a: 'They stay in your browser so you can compare attempts. Nothing goes to a server, and the clear button wipes them.',
            },
        ],
    },

    scroll: {
        title: 'Mouse Scroll Test Online — Wheel Skipping or Jumping Back | STZ Labs',
        description: 'Test your mouse wheel and detect scrolling that skips, reverses on its own or stalls. See direction, step count and irregular events.',
        h1: 'Mouse scroll test',
        intro: 'Scroll the wheel inside the area below, in both directions. The test counts every step, shows the direction and highlights reversals — when you scroll down but the event arrives as up.',
        areaTitle: 'Test area',
        areaSubtitle: 'Use the wheel inside this area',
        sections: [
            {
                heading: 'Skipping scroll means a dirty encoder',
                body: 'The wheel turns a shaft inside an encoder, which converts movement into pulses. Dust and oil get in through that opening and build up on the internal contacts. The result is a misread pulse: you scroll one step down and the page goes up, or you scroll three steps and only two register.\n\nIt is the most common wheel fault and also the easiest to fix. This is not mechanical wear, it is dirt interfering with the reading — cleaning often restores the original behaviour.',
            },
            {
                heading: 'How to clean the encoder',
                body: 'The least invasive route is spraying contact cleaner through the side gap around the wheel, then spinning it hard both ways for a minute or two so the fluid reaches the contacts. Let it dry fully before plugging the mouse back in.\n\nIf that fails, you need to open the shell. The screws usually hide under the glide skates, which come off carefully with gentle heat from a hairdryer. With the encoder exposed you can open its metal casing and clean the internal leaves with isopropyl alcohol. It is a medium difficulty repair, and the biggest risk is damaging the skates on the way in.\n\nAvoid regular lubricating oil. It attracts more dust and the problem returns worse within weeks.',
            },
            {
                heading: 'When it is not the mouse',
                body: 'Before opening anything, rule out software. Windows, browsers and some applications apply scroll smoothing and acceleration, and the combination can feel like irregular scrolling on perfectly good hardware.\n\nTry different programs. If scrolling only misbehaves in one, that program is the problem. Reversed scrolling is usually configuration — both Windows and vendor software offer a direction toggle, and it gets flipped by accident more often than you would think.',
            },
        ],
        faq: [
            {
                q: 'Scrolling skips slightly in both directions. Is it faulty?',
                a: 'Almost always a dirty encoder. If it happens in both directions and across different programs, the problem is physical, and cleaning is the first step before considering a replacement.',
            },
            {
                q: 'Why does the page go up when I scroll down?',
                a: 'If it happens constantly, direction is inverted in Windows or in the mouse software. If it only happens occasionally, the encoder is misreading a pulse — that means dirt or wear.',
            },
            {
                q: 'Does browser smooth scrolling affect the test?',
                a: 'Not the counting: the test reads the raw wheel event, before any animation. Smoothing changes what you see on screen, not what the mouse reported.',
            },
            {
                q: 'Can I test the wheel tilt?',
                a: 'Only when the mouse sends tilt as a horizontal scroll event, which most do. The test shows the detected axis, so you can check whether tilt is coming through.',
            },
        ],
    },

    'polling-rate': {
        title: 'Mouse Polling Rate Test — Measure Your Rate in Hz Online | STZ Labs',
        description: 'Measure your mouse polling rate in Hz. Find out whether it really delivers the promised 1000Hz and compare against the configured value.',
        h1: 'Polling rate test',
        intro: 'Move the mouse continuously inside the area below for a few seconds. The test measures the interval between movement events and estimates the rate in hertz. Steady, unbroken movement gives the most reliable reading.',
        areaTitle: 'Test area',
        areaSubtitle: 'Keep the mouse moving inside this area',
        sections: [
            {
                heading: 'What polling rate actually means',
                body: 'Polling rate is how many times per second the mouse reports its position to the computer. At 125 Hz that happens every 8 milliseconds; at 1000 Hz, every millisecond. It is how often the system learns where the cursor is.\n\nThe gain is largest at the bottom of the scale. Going from 125 to 500 Hz cuts the delay from 8 ms to 2 ms, which is noticeable in fast movement. From 500 to 1000 Hz the cut is a single millisecond — measurable, rarely perceptible. That is why the marketing jumps to 4000 or 8000 Hz deliver so little: the curve has already flattened.',
            },
            {
                heading: 'The CPU cost',
                body: 'Every report from the mouse raises an interrupt the processor has to service. At 1000 Hz that is a thousand interrupts per second; at 8000 Hz, eight thousand. On modern machines the impact is small, but it is real, and it shows up exactly when the CPU is already saturated — which is competitive gaming, the same scenario where the high rate was supposed to help.\n\nOn older computers or entry level processors, very high rates can reduce average FPS. If you landed here investigating a performance drop, test at 500 Hz and compare: the result is often steadier than at 1000.',
            },
            {
                heading: 'How to change it, and why readings diverge',
                body: 'The rate is set in vendor software — Razer Synapse, Logitech G HUB, Corsair iCUE, SteelSeries GG — usually under a performance section. Some mice offer a physical button or key combination to switch without software.\n\nIf the value measured here sits well below what you configured, the cable, the distance to a wireless receiver, or USB 3.0 interference are the usual suspects — 3.0 ports are a classic source of noise for 2.4 GHz receivers. Before concluding anything, repeat the measurement with wide, continuous strokes: a small sample skews the result.\n\nIt helps to know how the measurement works. Browsers do not deliver one event per mouse report: they group the reports and deliver them in batches, so counting events would always land near 60 per second, whatever mouse you own. This test uses `getCoalescedEvents`, which returns the raw samples inside each batch — that is how 500 or 1000 Hz becomes visible. It works on Chromium based browsers: Chrome, Edge and Opera. Firefox and its forks implement the method but do not expose the samples in between, and delivery stays pinned around 60 Hz — including on 144 Hz monitors, because the limit belongs to the browser rather than the screen. When it detects that pattern, the test says so rather than presenting the browser ceiling as if it were the mouse rate.',
            },
        ],
        faq: [
            {
                q: 'Why does the reading not match my configured 1000 Hz?',
                a: 'Short or intermittent movement drags the average down, so keep moving in wide strokes for a few seconds. If the number stays low, check the cable, how far the wireless receiver sits, and whether it is plugged into a USB 3.0 port. And check which browser you are in: on Firefox and its forks the reading stays around 60 Hz whatever the monitor, and the test flags it when that happens.',
            },
            {
                q: 'Is 1000 Hz worth using?',
                a: 'Worth it if your CPU has headroom. The real gain is leaving 125 Hz behind; from 500 to 1000 the difference is one millisecond. On weaker machines, 500 Hz often produces a steadier result.',
            },
            {
                q: 'Does a high rate drain a wireless mouse faster?',
                a: 'Considerably. Reporting a thousand times per second costs far more than 125, and battery life commonly halves or worse between the two extremes.',
            },
            {
                q: 'Do wireless mice poll slower than wired ones?',
                a: 'Not necessarily any more — dedicated receivers hold 1000 Hz reliably. Bluetooth is a different story: it usually sits at 125 Hz and suffers more interference.',
            },
        ],
    },
};
