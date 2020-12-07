import React, { FunctionComponent } from 'react'

interface Props {
  icon:
    | 'add'
    | 'checkboxEmpty'
    | 'checkboxChecked'
    | 'delete'
    | 'expand'
    | 'signOut'
  className?: string
}

export const Icon: FunctionComponent<Props> = ({ className, icon }) => (
  <svg
    className={`h-6 w-6 ${className}`}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg">
    {icon === 'add' && (
      <path
        d="M20,11h-7V4c0-0.552-0.448-1-1-1s-1,0.448-1,1v7H4c-0.552,0-1,0.448-1,1s0.448,1,1,1h7v7c0,0.552,0.448,1,1,1s1-0.448,1-1 v-7h7c0.552,0,1-0.448,1-1S20.552,11,20,11z"
        fill="currentColor"
      />
    )}
    {icon === 'checkboxChecked' && (
      <path
        d="M11.707,15.707C11.512,15.902,11.256,16,11,16s-0.512-0.098-0.707-0.293l-4-4c-0.391-0.391-0.391-1.023,0-1.414 s1.023-0.391,1.414,0L11,13.586l8.35-8.35C17.523,3.251,14.911,2,12,2C6.477,2,2,6.477,2,12c0,5.523,4.477,10,10,10s10-4.477,10-10 c0-1.885-0.531-3.642-1.438-5.148L11.707,15.707z"
        fill="currentColor"
      />
    )}
    {icon === 'checkboxEmpty' && (
      <path
        d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z"
        fill="currentColor"
      />
    )}
    {icon === 'delete' && (
      <path
        d="M 10.806641 2 C 10.289641 2 9.7956875 2.2043125 9.4296875 2.5703125 L 9 3 L 4 3 A 1.0001 1.0001 0 1 0 4 5 L 20 5 A 1.0001 1.0001 0 1 0 20 3 L 15 3 L 14.570312 2.5703125 C 14.205312 2.2043125 13.710359 2 13.193359 2 L 10.806641 2 z M 4.3652344 7 L 5.8925781 20.263672 C 6.0245781 21.253672 6.877 22 7.875 22 L 16.123047 22 C 17.121047 22 17.974422 21.254859 18.107422 20.255859 L 19.634766 7 L 4.3652344 7 z"
        fill="currentColor"
      />
    )}
    {icon === 'expand' && (
      <path
        d="M12,14.071L8.179,10.25c-0.414-0.414-1.086-0.414-1.5,0l0,0c-0.414,0.414-0.414,1.086,0,1.5l4.614,4.614 c0.391,0.391,1.024,0.391,1.414,0l4.614-4.614c0.414-0.414,0.414-1.086,0-1.5v0c-0.414-0.414-1.086-0.414-1.5,0L12,14.071z"
        fill="currentColor"
      />
    )}
    {icon === 'signOut' && (
      <path
        d="M4,2v14h2.822h0.001c0.275,0,0.528-0.127,0.696-0.349l0.246-0.324l1.529,1.175L8.961,16.94C8.452,17.608,7.66,18,6.82,18h0 H4v4h6.059l1.682-4.397c0.101-0.259,0.067-0.543-0.074-0.774l-2.823-1.977c-0.742-0.544-0.941-1.566-0.458-2.349l1.857-3.254 l-0.92-0.153C9.113,9.023,8.87,9.038,8.657,9.144L6.58,10.183c-0.436,0.218-0.966,0.042-1.184-0.394l0,0 C5.177,9.354,5.354,8.823,5.79,8.605l2.077-1.04c0.641-0.32,1.471-0.509,2.15-0.275l1.121,0.409l1.536,0.685 c0.53,0.237,0.969,0.653,1.234,1.17l0.707,0.966c0.152,0.295,0.407,0.48,0.738,0.48H17c0.552,0,1,0.448,1,1v0c0,0.552-0.448,1-1,1 l-1.602-0.001c-0.995,0-1.896-0.55-2.352-1.437l-0.38-0.564l-1.577,2.843l1.749,1.573c0.742,0.743,0.976,1.855,0.595,2.831L12,22h8 V2H4z M13.764,8c-0.975,0-1.765-0.79-1.765-1.765s0.79-1.765,1.765-1.765c0.975,0,1.765,0.79,1.765,1.765S14.739,8,13.764,8z"
        fill="currentColor"
      />
    )}
  </svg>
)