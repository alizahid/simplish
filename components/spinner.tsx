import React, { FunctionComponent } from 'react'

interface Props {
  className?: string
}

export const Spinner: FunctionComponent<Props> = ({ className }) => (
  <div className={className}>
    <div className={`flex items-center h-2 w-8`}>
      <style jsx>{`
        .one,
        .two,
        .three {
          animation: spinner 1.4s infinite ease-in-out both;
        }

        .one {
          animation-delay: -0.32s;
        }

        .two {
          animation-delay: -0.16s;
        }

        @keyframes spinner {
          0%,
          80%,
          100% {
            opacity: 0.1;
          }
          40% {
            opacity: 1;
          }
        }
      `}</style>

      <div className="one h-2 w-2 rounded-full bg-black dark:bg-white" />
      <div className="two h-2 w-2 rounded-full ml-1 bg-black dark:bg-white" />
      <div className="three h-2 w-2 rounded-full ml-1 bg-black dark:bg-white" />
    </div>
  </div>
)
