import React, { FunctionComponent } from 'react'

interface Props {
  className?: string
  disabled?: boolean
  placeholder?: string
  value: string

  onBlur?: () => void
  onChange: (text: string) => void
  onEnter?: () => void
  onEscape?: () => void
}

export const Input: FunctionComponent<Props> = ({
  className,
  disabled,
  onBlur,
  onChange,
  onEnter,
  onEscape,
  placeholder,
  value
}) => (
  <input
    autoFocus
    className={`bg-transparent resize-none h-6 ${className}`}
    onBlur={() => onBlur?.()}
    onChange={(event) => {
      onChange(event.target.value)
    }}
    onKeyDown={async (event) => {
      if (event.key === 'Escape') {
        onEscape?.()
      }

      if (event.key === 'Enter') {
        onEnter?.()
      }
    }}
    placeholder={placeholder}
    readOnly={disabled}
    type="text"
    value={value}
  />
)
