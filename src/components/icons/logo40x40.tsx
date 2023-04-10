//TODO: Logo transpartnt background

export const DouveryLogo40x40 = ({ color, size }: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    width={size || '40'}
    zoomAndPan="magnify"
    viewBox="0 0 30 30.000001"
    height={size || '40'}
    preserveAspectRatio="xMidYMid meet"
    version="1.0"
  >
    <defs>
      <clipPath id="c8af068823">
        <path d="M 2 7 L 28 7 L 28 19 L 2 19 Z M 2 7 " clip-rule="nonzero" />
      </clipPath>
      <clipPath id="155bc35e6b">
        <path
          d="M 24.699219 5.355469 L 28.214844 16.140625 L 5.269531 23.613281 L 1.757812 12.824219 Z M 24.699219 5.355469 "
          clip-rule="nonzero"
        />
      </clipPath>
      <clipPath id="28ccf93660">
        <path
          d="M 27.070312 13.101562 L 24.496094 7.746094 C 24.457031 7.667969 24.363281 7.609375 24.28125 7.636719 L 11.691406 9.742188 C 11.546875 9.773438 11.476562 9.917969 11.53125 10.050781 L 13.210938 13.25 C 13.28125 13.378906 13.183594 13.542969 13.039062 13.5625 L 2.59375 14.09375 C 2.460938 14.105469 2.367188 14.226562 2.410156 14.363281 C 2.433594 14.433594 2.496094 14.488281 2.5625 14.511719 L 21.09375 18.355469 C 21.273438 18.386719 21.410156 18.207031 21.328125 18.050781 L 18.902344 13.707031 C 18.824219 13.566406 18.921875 13.398438 19.085938 13.390625 L 26.882812 13.402344 C 27.035156 13.398438 27.132812 13.246094 27.070312 13.101562 Z M 27.070312 13.101562 "
          clip-rule="nonzero"
        />
      </clipPath>
      <clipPath id="fedb158081">
        <path
          d="M 22.105469 14.515625 L 26.828125 14.515625 L 26.828125 18.582031 L 22.105469 18.582031 Z M 22.105469 14.515625 "
          clip-rule="nonzero"
        />
      </clipPath>
      <clipPath id="92e784538e">
        <path
          d="M 24.441406 14.515625 L 25.183594 15.871094 L 26.773438 16.5 L 25.183594 17.132812 L 24.441406 18.488281 L 23.699219 17.132812 L 22.105469 16.5 L 23.699219 15.871094 L 24.441406 14.515625 "
          clip-rule="nonzero"
        />
      </clipPath>
    </defs>
    <g clip-path="url(#c8af068823)">
      <g clip-path="url(#155bc35e6b)">
        <g clip-path="url(#28ccf93660)">
          <path
            fill={color || '#fbd316'}
            d="M 24.609375 5.535156 L 28.078125 16.1875 L 5.40625 23.570312 L 1.9375 12.917969 Z M 24.609375 5.535156 "
            fill-opacity="1"
            fill-rule="nonzero"
          />
        </g>
      </g>
    </g>
    <g clip-path="url(#fedb158081)">
      <g clip-path="url(#92e784538e)">
        <path
          fill={color || '#fbd316'}
          d="M 22.105469 14.515625 L 26.828125 14.515625 L 26.828125 18.449219 L 22.105469 18.449219 Z M 22.105469 14.515625 "
          fill-opacity="1"
          fill-rule="nonzero"
        />
      </g>
    </g>
  </svg>
);
