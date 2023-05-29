import { useEffect, useState } from "react";
import Joyride, { Step } from 'react-joyride';

const Onboarding: React.FC = () => {
    const [tourRunning, setTourRunning] = useState<boolean>(false)

    const tourSteps: Step[] = [
        {
          target: '#home',
          content: "Home- Here is where you will a snapshot of your current stats for the months. Also, the financial details you've currently provided.",
          disableBeacon: true
          // ... additional options
        },
        {
            target: '#profile',
            content: "Profile- A more detailed look. Here you will see your income by week of the month, along with a running tally of the expenses currently un-earned for the month.",
            disableBeacon: true
            // ... additional options
        },
        {
            target: '#setup',
            content: "Setup- The place where you will go to add your income for the day.",
            disableBeacon: true
            // ... additional options
        },
        // ... add more steps as needed
    ];

    useEffect(() => {
        setTourRunning(true)
    }, [])

    return (
        <>
            <Joyride
            steps={tourSteps}
            run={tourRunning}
            continuous={true}
            showProgress={true}
            styles={{
                options: {
                  arrowColor: '#000',
                  backgroundColor: '#193A85',
                  overlayColor: '#A9ABB1',
                  primaryColor: '#000',
                  textColor: '#fff',
                  width: 500,
                  zIndex: 1000,
                }
              }}
            // ... additional options
            />
        </>
    )
}
export default Onboarding