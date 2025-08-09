import type { ThumbnailProps } from '@/types/post';
import type React from 'react';
import { cn } from '../../common/cn';

export const MFDiagram = ({
  explode = false,
  ...props
}: React.JSX.IntrinsicElements['svg'] & { explode?: boolean }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      direction="ltr"
      height="100%"
      viewBox="-888.508947369881 1718.165454559953 224.41049544097427 252.8943318439808"
      strokeLinecap="round"
      strokeLinejoin="round"
      data-color-mode="light"
      {...props}
    >
      <defs>
        <mask id="_export_2_r7a_">
          <rect x={0} y={0} width={8} height={8} fill="white" />
          <g strokeLinecap="round" stroke="black">
            <line
              x1="0.6666666666666666"
              y1={2}
              x2={2}
              y2="0.6666666666666666"
            />
            <line
              x1="3.333333333333333"
              y1="4.666666666666666"
              x2="4.666666666666666"
              y2="3.333333333333333"
            />
            <line x1={6} y1="7.333333333333333" x2="7.333333333333333" y2={6} />
          </g>
        </mask>
        <pattern
          id="_export_2_r79__hash_pattern_light_0"
          width={8}
          height={8}
          patternUnits="userSpaceOnUse"
        >
          <rect
            x={0}
            y={0}
            width={8}
            height={8}
            fill="#fcfffe"
            mask="url(#_export_2_r7a_)"
          />
        </pattern>
      </defs>
      <g transform="matrix(1, 0, 0, 1, -855.7423, 1919.9867)" opacity={1}>
        <path
          className={cn(explode ? 'translate-y-[5%]' : 'animate-wiggle')}
          d="M7,-0.0148 L151.7919,-0.3202 Q158.7919,-0.3349 158.8843,4.5503 L159.069,14.3207 Q159.1614,19.206 152.1614,19.2263 L6.1051,19.6504 Q-0.8949,19.6708 -0.6521,14.5378 L-0.1667,4.2719 Q0.0761,-0.8611 7.0756,-0.7806 L151.984,0.8856 Q158.9836,0.9661 158.9398,5.6146 L158.8521,14.9114 Q158.8083,19.5598 151.8083,19.5794 L6.8822,19.9852 Q-0.1178,20.0048 0.1236,15.0978 L0.6066,5.2838 Q0.848,0.3768 7,-0.0148 "
          stroke="#4cb05e"
          strokeWidth="3.5"
          fill="none"
        />
      </g>
      <g transform="matrix(1, 0, 0, 1, -821.5401, 1918.5429)" opacity={1}>
        <g transform="scale(1)">
          <defs>
            <clipPath id="_export_2_r79__shape_w-iVztIVhYki1RywT40Fk_clip">
              <path d="M-100.1857,-115.7762 h201 v215.77615948739992 h-201 Z" />
            </clipPath>
          </defs>
          <g
            fill="none"
            stroke="#4cb05e"
            strokeWidth="3.5"
            strokeLinejoin="round"
            strokeLinecap="round"
            pointerEvents="none"
            className={cn(explode ? 'translate-y-[5%]' : 'animate-wiggle')}
          >
            <g
              style={{
                clipPath:
                  'url("#_export_2_r79__shape_w-iVztIVhYki1RywT40Fk_clip")',
              }}
            >
              <rect
                x="-100.1857"
                y="-115.7762"
                width={201}
                height="215.7762"
                opacity={0}
              />
              <path
                d="M0,0L-0.18571465274611346,-15.776159487399928"
                strokeDasharray="none"
                strokeDashoffset="none"
              />
            </g>
            <path d="M -1.8999143455035181 -12.724681253272998 L -0.18571465274611346 -15.776159487399928 L 1.5998431707243852 -12.76587988924907" />
          </g>
        </g>
      </g>
      <g transform="matrix(1, 0, 0, 1, -810.4165, 1908.6008)" opacity={1}>
        <g transform="scale(1)">
          <defs>
            <clipPath id="_export_2_r79__shape_inehV_E9CRDIYRPhe_Ogq_clip">
              <path d="M-100,-100 h201 v216.07844881267727 h-201 Z" />
            </clipPath>
          </defs>
          <g
            fill="none"
            stroke="#4cb05e"
            strokeWidth="3.5"
            strokeLinejoin="round"
            strokeLinecap="round"
            pointerEvents="none"
            className={cn(explode ? 'translate-y-[5%]' : 'animate-wiggle')}
          >
            <g
              style={{
                clipPath:
                  'url("#_export_2_r79__shape_inehV_E9CRDIYRPhe_Ogq_clip")',
              }}
            >
              <rect
                x={-100}
                y={-100}
                width={201}
                height="216.0784"
                opacity={0}
              />
              <path
                d="M0,0L0.49372919876389987,16.078448812677266"
                strokeDasharray="none"
                strokeDashoffset="none"
              />
            </g>
            <path d="M 2.1498713454247085 12.99507514248195 L 0.49372919876389987 16.078448812677266 L -1.3484796556549 13.102500806293254" />
          </g>
        </g>
      </g>
      <g transform="matrix(1, 0, 0, 1, -856.5089, 1750.276)" opacity={1}>
        <path
          className={cn(
            explode
              ? 'translate-y-[-5%] translate-x-[-5%]'
              : 'animate-wiggle-in-place',
          )}
          d="M6.9995,-0.0868 L68.7321,-0.8527 Q75.7315,-0.9395 75.6204,6.0596 L75.0144,44.215 Q74.9032,51.2141 67.9037,51.295 L6.4445,52.0053 Q-0.555,52.0862 -0.4165,45.0875 L0.3187,7.9562 Q0.4573,0.9575 7.457,0.8955 L70.0684,0.3402 Q77.0681,0.2781 77.0259,7.278 L76.7938,45.7758 Q76.7516,52.7757 69.752,52.694 L6.9522,51.9614 Q-0.0473,51.8798 -0.1257,44.8802 L-0.5418,7.7083 Q-0.6202,0.7087 6.9995,-0.0868 "
          stroke="#4ba1f1"
          strokeWidth="3.5"
          fill="none"
        />
      </g>
      <g transform="matrix(1, 0, 0, 1, -819.7172, 1775.1405)" opacity={1}>
        <path
          className={cn(
            explode
              ? 'translate-y-[-5%] translate-x-[-5%]'
              : 'animate-wiggle-in-place',
          )}
          fill="#6fbbf8"
          d="M6.7638,0 L20.2913,0 Q27.0551,0 27.0551,4.7022 L27.0551,14.1067 Q27.0551,18.809 20.2913,18.809 L6.7638,18.809 Q0,18.809 0,14.1067 L0,4.7022 Q0,0 6.7638,0 "
        />
        <path
          className={cn(
            explode
              ? 'translate-y-[-5%] translate-x-[-5%]'
              : 'animate-wiggle-in-place',
          )}
          fill="url(#_export_2_r79__hash_pattern_light_0)"
          d="M6.7638,0 L20.2913,0 Q27.0551,0 27.0551,4.7022 L27.0551,14.1067 Q27.0551,18.809 20.2913,18.809 L6.7638,18.809 Q0,18.809 0,14.1067 L0,4.7022 Q0,0 6.7638,0 "
        />
        <path
          className={cn(
            explode
              ? 'translate-y-[-5%] translate-x-[-5%]'
              : 'animate-wiggle-in-place',
          )}
          d="M6.4947,-0.1024 L19.4841,-0.3073 Q25.9788,-0.4097 26.3462,4.3962 L27.081,14.0079 Q27.4484,18.8138 20.5383,19.0035 L6.7181,19.3829 Q-0.192,19.5726 -0.0097,14.6809 L0.3549,4.8975 Q0.5372,0.0058 6.9475,-0.0064 L19.7679,-0.0308 Q26.1781,-0.043 26.571,4.8691 L27.3569,14.6935 Q27.7498,19.6056 20.75,19.5513 L5.8847,19.436 Q-1.115,19.3818 -1.0058,14.4405 L-0.7873,4.5578 Q-0.678,-0.3835 6.4947,-0.1024 "
          stroke="#4ba1f1"
          strokeWidth="3.5"
          fill="none"
        />
      </g>
      <g transform="matrix(1, 0, 0, 1, -850.994, 1776.2173)" opacity={1}>
        <path
          className={cn(
            explode
              ? 'translate-y-[-5%] translate-x-[-5%]'
              : 'animate-wiggle-in-place',
          )}
          fill="#e9acf8"
          d="M4.0749,0 L12.2248,0 Q16.2997,0 16.2997,4.3926 L16.2997,13.1777 Q16.2997,17.5702 12.2248,17.5702 L4.0749,17.5702 Q0,17.5702 0,13.1777 L0,4.3926 Q0,0 4.0749,0 "
        />
        <path
          className={cn(
            explode
              ? 'translate-y-[-5%] translate-x-[-5%]'
              : 'animate-wiggle-in-place',
          )}
          fill="url(#_export_2_r79__hash_pattern_light_0)"
          d="M4.0749,0 L12.2248,0 Q16.2997,0 16.2997,4.3926 L16.2997,13.1777 Q16.2997,17.5702 12.2248,17.5702 L4.0749,17.5702 Q0,17.5702 0,13.1777 L0,4.3926 Q0,0 4.0749,0 "
        />
        <path
          className={cn(
            explode
              ? 'translate-y-[-5%] translate-x-[-5%]'
              : 'animate-wiggle-in-place',
          )}
          d="M4.2878,-0.0028 L12.8635,-0.0085 Q17.1513,-0.0114 17.2071,4.645 L17.3187,13.9579 Q17.3745,18.6143 13.2367,18.1465 L4.9611,17.2107 Q0.8233,16.7428 0.4594,12.3961 L-0.2684,3.7028 Q-0.6323,-0.6439 3.8759,-0.4191 L12.8922,0.0304 Q17.4004,0.2551 17.337,4.718 L17.2102,13.6437 Q17.1468,18.1065 13.0824,17.7327 L4.9537,16.9852 Q0.8893,16.6114 0.8167,12.3286 L0.6714,3.763 Q0.5987,-0.5198 4.2878,-0.0028 "
          stroke="#e085f4"
          strokeWidth="3.5"
          fill="none"
        />
      </g>
      <g transform="matrix(1, 0, 0, 1, -850.2372, 1763.7185)" opacity={1}>
        <path
          className={cn(
            explode
              ? 'translate-y-[-5%] translate-x-[-5%]'
              : 'animate-wiggle-in-place',
          )}
          fill="#ddedfa"
          d="M7,0 L52.0717,0 Q59.0717,0 59.0717,0.3815 L59.0717,1.1444 Q59.0717,1.5259 52.0717,1.5259 L7,1.5259 Q0,1.5259 0,1.1444 L0,0.3815 Q0,0 7,0 "
        />
        <path
          className={cn(
            explode
              ? 'translate-y-[-5%] translate-x-[-5%]'
              : 'animate-wiggle-in-place',
          )}
          d="M7,-0.0234 L51.9605,-0.1737 Q58.9604,-0.1971 59.1155,0.2465 L59.4258,1.1336 Q59.5809,1.5772 52.5812,1.6464 L6.1849,2.1053 Q-0.8148,2.1745 -0.7935,1.4133 L-0.7511,-0.1091 Q-0.7298,-0.8703 6.27,-0.8155 L51.7119,-0.4598 Q58.7117,-0.405 58.8533,-0.14 L59.1365,0.3902 Q59.2781,0.6553 52.2794,0.7902 L5.9424,1.6834 Q-1.0563,1.8183 -0.6964,1.5778 L0.0234,1.0968 Q0.3833,0.8563 7,-0.0234 "
          stroke="#4ba1f1"
          strokeWidth="3.5"
          fill="none"
        />
      </g>
      <g transform="matrix(1, 0, 0, 1, -773.2523, 1750.1655)" opacity={1}>
        <path
          d="M7,-0.0145 L68.6509,-0.1417 Q75.6509,-0.1562 75.6565,6.8438 L75.6879,46.5263 Q75.6934,53.5263 68.6934,53.5201 L8.0191,53.4662 Q1.0191,53.46 0.8171,46.4629 L-0.3262,6.8585 Q-0.5282,-0.1385 6.4712,-0.2313 L68.0913,-1.0478 Q75.0907,-1.1406 75.164,5.859 L75.5718,44.7778 Q75.6451,51.7774 68.6451,51.7771 L6.5791,51.7747 Q-0.4209,51.7744 -0.5089,44.775 L-0.9808,7.2101 Q-1.0688,0.2106 7,-0.0145 "
          stroke="#f1ac4b"
          strokeWidth="3.5"
          fill="none"
        />
      </g>
      <g transform="matrix(1, 0, 0, 1, -742.0165, 1774.0705)" opacity={1}>
        <path
          fill="#fecb92"
          d="M6.5334,0 L19.6003,0 Q26.1337,0 26.1337,5.0592 L26.1337,15.1776 Q26.1337,20.2369 19.6003,20.2369 L6.5334,20.2369 Q0,20.2369 0,15.1776 L0,5.0592 Q0,0 6.5334,0 "
        />
        <path
          fill="url(#_export_2_r79__hash_pattern_light_0)"
          d="M6.5334,0 L19.6003,0 Q26.1337,0 26.1337,5.0592 L26.1337,15.1776 Q26.1337,20.2369 19.6003,20.2369 L6.5334,20.2369 Q0,20.2369 0,15.1776 L0,5.0592 Q0,0 6.5334,0 "
        />
        <path
          d="M6.7819,0.2758 L20.3457,0.8274 Q27.1276,1.1032 26.6371,5.7453 L25.656,15.0296 Q25.1654,19.6717 18.7567,19.7789 L5.9392,19.9933 Q-0.4695,20.1005 -0.0914,15.2361 L0.6649,5.5072 Q1.0431,0.6428 7.5113,0.4631 L20.4477,0.1037 Q26.9159,-0.0759 26.7545,5.2222 L26.4317,15.8184 Q26.2703,21.1165 19.5332,20.9553 L6.059,20.633 Q-0.6781,20.4719 -0.5352,15.1259 L-0.2494,4.434 Q-0.1065,-0.9119 6.7819,0.2758 "
          stroke="#f1ac4b"
          strokeWidth="3.5"
          fill="none"
        />
      </g>
      <g transform="matrix(1, 0, 0, 1, -768.0493, 1775.2912)" opacity={1}>
        <path
          fill="#e9acf8"
          d="M4.0749,0 L12.2248,0 Q16.2997,0 16.2997,4.3926 L16.2997,13.1777 Q16.2997,17.5702 12.2248,17.5702 L4.0749,17.5702 Q0,17.5702 0,13.1777 L0,4.3926 Q0,0 4.0749,0 "
        />
        <path
          fill="url(#_export_2_r79__hash_pattern_light_0)"
          d="M4.0749,0 L12.2248,0 Q16.2997,0 16.2997,4.3926 L16.2997,13.1777 Q16.2997,17.5702 12.2248,17.5702 L4.0749,17.5702 Q0,17.5702 0,13.1777 L0,4.3926 Q0,0 4.0749,0 "
        />
        <path
          d="M4.1831,0.1871 L12.5494,0.5613 Q16.7325,0.7484 16.7954,4.8295 L16.921,12.9916 Q16.9838,17.0727 12.7886,16.9981 L4.3982,16.8489 Q0.203,16.7743 -0.0692,12.6409 L-0.6134,4.374 Q-0.8856,0.2405 3.5193,0.1374 L12.3289,-0.0689 Q16.7337,-0.1721 16.5137,4.2368 L16.0735,13.0546 Q15.8534,17.4635 11.9641,17.569 L4.1854,17.7801 Q0.296,17.8856 0.0621,13.4613 L-0.4058,4.6127 Q-0.6397,0.1884 4.1831,0.1871 "
          stroke="#e085f4"
          strokeWidth="3.5"
          fill="none"
        />
      </g>
      <g transform="matrix(1, 0, 0, 1, -767.1528, 1762.6091)" opacity={1}>
        <path
          fill="#f9f0e6"
          d="M7,0 L52.0717,0 Q59.0717,0 59.0717,0.3815 L59.0717,1.1444 Q59.0717,1.5259 52.0717,1.5259 L7,1.5259 Q0,1.5259 0,1.1444 L0,0.3815 Q0,0 7,0 "
        />
        <path
          d="M6.9999,-0.0356 L52.5705,-0.2676 Q59.5704,-0.3032 59.7125,-0.0451 L59.9965,0.471 Q60.1385,0.7291 53.1399,0.8699 L7.3751,1.7909 Q0.3765,1.9318 0.3054,1.4522 L0.1632,0.4932 Q0.0921,0.0136 7.0919,0.0632 L52.936,0.388 Q59.9358,0.4376 59.6859,0.7274 L59.186,1.307 Q58.9361,1.5968 51.9361,1.607 L7.4984,1.6719 Q0.4984,1.6821 0.4229,1.3644 L0.2718,0.7289 Q0.1963,0.4111 6.9999,-0.0356 "
          stroke="#f1ac4b"
          strokeWidth="3.5"
          fill="none"
        />
      </g>
      <g transform="matrix(1, 0, 0, 1, -855.5593, 1813.5385)" opacity={1}>
        <path
          d="M6.9998,0.0507 L150.2853,1.0887 Q157.2851,1.1394 157.3259,8.1393 L157.7898,87.9221 Q157.8305,94.9219 150.8305,94.9204 L6.324,94.8897 Q-0.676,94.8882 -0.6868,87.8882 L-0.8128,6.1165 Q-0.8236,-0.8835 6.1762,-0.8316 L149.9933,0.2343 Q156.9931,0.2861 157.0039,7.2861 L157.1267,87.3584 Q157.1374,94.3584 150.1375,94.374 L5.8812,94.6957 Q-1.1188,94.7113 -1.0196,87.712 L0.1318,6.4481 Q0.231,-0.5512 6.9998,0.0507 "
          stroke="#1d1d1d"
          strokeWidth="3.5"
          fill="none"
        />
      </g>
      <g transform="matrix(1, 0, 0, 1, -844.6449, 1823.4923)" opacity={1}>
        <path fill="#6fbbf8" d="M0, 0L66.88, 0,66.88, 18.47,0, 18.47Z" />
        <path
          fill="url(#_export_2_r79__hash_pattern_light_0)"
          d="M0, 0L66.88, 0,66.88, 18.47,0, 18.47Z"
        />
        <g strokeWidth="3.5" stroke="#4ba1f1" fill="none" pointerEvents="all">
          <line
            x1={0}
            y1={0}
            x2="66.88"
            y2={0}
            strokeDasharray="7.388 9.235"
            strokeDashoffset="3.5"
          />
          <line
            x1="66.88"
            y1={0}
            x2="66.88"
            y2="18.47"
            strokeDasharray="7.695833333333333 7.695833333333333"
            strokeDashoffset="2.30875"
          />
          <line
            x1="66.88"
            y1="18.47"
            x2={0}
            y2="18.47"
            strokeDasharray="7.388 9.235"
            strokeDashoffset="3.5"
          />
          <line
            x1={0}
            y1="18.47"
            x2={0}
            y2={0}
            strokeDasharray="7.695833333333333 7.695833333333333"
            strokeDashoffset="2.30875"
          />
        </g>
      </g>
      <g transform="matrix(1, 0, 0, 1, -766.6339, 1828.2059)" opacity={1}>
        <path fill="#fecb92" d="M0, 0L61.97, 0,61.97, 19.04,0, 19.04Z" />
        <path
          fill="url(#_export_2_r79__hash_pattern_light_0)"
          d="M0, 0L61.97, 0,61.97, 19.04,0, 19.04Z"
        />
        <g strokeWidth="3.5" stroke="#f1ac4b" fill="none" pointerEvents="all">
          <line
            x1={0}
            y1={0}
            x2="61.97"
            y2={0}
            strokeDasharray="8.62125 11.495"
            strokeDashoffset="3.5"
          />
          <line
            x1="61.97"
            y1={0}
            x2="61.97"
            y2="19.04"
            strokeDasharray="7.933333333333332 7.933333333333332"
            strokeDashoffset="2.38"
          />
          <line
            x1="61.97"
            y1="19.04"
            x2={0}
            y2="19.04"
            strokeDasharray="8.62125 11.495"
            strokeDashoffset="3.5"
          />
          <line
            x1={0}
            y1="19.04"
            x2={0}
            y2={0}
            strokeDasharray="7.933333333333332 7.933333333333332"
            strokeDashoffset="2.38"
          />
        </g>
      </g>
      <g transform="matrix(1, 0, 0, 1, -777.6126, 1865.8977)" opacity={1}>
        <path
          d="M6.9995,0.0843 L66.4832,0.8005 Q73.4827,0.8847 73.6359,5.6998 L73.9423,15.33 Q74.0955,20.1451 67.0966,20.2694 L6.2197,21.3508 Q-0.7792,21.4751 -0.724,16.3149 L-0.6138,5.9945 Q-0.5586,0.8343 6.4413,0.7992 L66.9319,0.4958 Q73.9318,0.4606 74.1852,5.7201 L74.6919,16.239 Q74.9452,21.4984 67.9454,21.4506 L8.046,21.0415 Q1.0461,20.9937 0.8545,15.934 L0.4714,5.8146 Q0.2798,0.7549 6.9995,0.0843 "
          stroke="#1d1d1d"
          strokeWidth="3.5"
          fill="none"
        />
      </g>
      <g transform="matrix(1, 0, 0, 1, -844.5207, 1860.2172)" opacity={1}>
        <path
          fill="#e9acf8"
          d="M7,0 L47.957,0 Q54.957,0 54.957,7 L54.957,22.3791 Q54.957,29.3791 47.957,29.3791 L7,29.3791 Q0,29.3791 0,22.3791 L0,7 Q0,0 7,0 "
        />
        <path
          fill="url(#_export_2_r79__hash_pattern_light_0)"
          d="M7,0 L47.957,0 Q54.957,0 54.957,7 L54.957,22.3791 Q54.957,29.3791 47.957,29.3791 L7,29.3791 Q0,29.3791 0,22.3791 L0,7 Q0,0 7,0 "
        />
        <path
          d="M7,-0.0142 L47.8467,-0.097 Q54.8467,-0.1112 55.0252,6.8865 L55.4128,22.0831 Q55.5912,29.0808 48.5921,28.9711 L7.2457,28.3234 Q0.2465,28.2138 0.435,21.2163 L0.8465,5.939 Q1.035,-1.0584 8.0311,-0.8234 L47.8157,0.5131 Q54.8117,0.7481 55.0135,7.7452 L55.4507,22.9103 Q55.6524,29.9073 48.6539,29.7621 L7.6624,28.9111 Q0.6639,28.7658 0.2578,21.7776 L-0.5967,7.0751 Q-1.0028,0.0869 7,-0.0142 "
          stroke="#e085f4"
          strokeWidth="3.5"
          fill="none"
        />
      </g>
      <g transform="matrix(1, 0, 0, 1, -820.5569, 1930.9169)" opacity={1}>
        <g transform="scale(1)">
          <defs>
            <clipPath id="_export_2_r79__shape_pTdLc3lhFvTSzxN7jiY8S_clip">
              <path d="M-94.2523,-202.2976 h204.8032044547762 v231.59787418496717 h-204.8032044547762 Z" />
            </clipPath>
          </defs>
          <g
            fill="none"
            stroke="#e085f4"
            strokeWidth="3.5"
            strokeLinejoin="round"
            strokeLinecap="round"
            pointerEvents="none"
          >
            <g
              style={{
                clipPath:
                  'url("#_export_2_r79__shape_pTdLc3lhFvTSzxN7jiY8S_clip")',
              }}
            >
              <rect
                x="-94.2523"
                y="-202.2976"
                width="204.8032"
                height="231.5979"
                opacity={0}
              />
              <path
                d="M5.747654919818956,-70.6996801650298L10.550859374595147,-102.29755434999696"
                strokeDasharray="none"
                strokeDashoffset="none"
              />
            </g>
            <path d="M 6.559132540617082 -97.30496244552137 L 10.550859374595147 -102.29755434999696 L 12.878707377610507 -96.34432155456614" />
          </g>
        </g>
      </g>
      <g transform="matrix(1, 0, 0, 1, -817.8548, 1900.9648)" opacity={1}>
        <g transform="scale(1)">
          <defs>
            <clipPath id="_export_2_r79__shape_RglrYWyouyYcaz4n7rcHj_clip">
              <path d="M-71.7089,-125.5806 h225.44906222142345 v201 h-225.44906222142345 Z" />
            </clipPath>
          </defs>
          <g
            fill="none"
            stroke="#e085f4"
            strokeWidth="3.5"
            strokeLinejoin="round"
            strokeLinecap="round"
            pointerEvents="none"
          >
            <g
              style={{
                clipPath:
                  'url("#_export_2_r79__shape_RglrYWyouyYcaz4n7rcHj_clip")',
              }}
            >
              <rect
                x="-71.7089"
                y="-125.5806"
                width="225.4491"
                height={201}
                opacity={0}
              />
              <path
                d="M28.291102375108153,-25.58059728225544L53.74016459653159,-25.138487467745815"
                strokeDasharray="none"
                strokeDashoffset="none"
              />
            </g>
            <path d="M 49.376468700733845 -27.759969356013713 L 53.74016459653159 -25.138487467745815 L 49.28804673783192 -22.670156911729023" />
          </g>
        </g>
      </g>
      <g transform="matrix(1, 0, 0, 1, -816.559, 1866.7592)" opacity={1}>
        <g transform="scale(1)">
          <defs>
            <clipPath id="_export_2_r79__shape_o7RIqC3KaMnCPkAPJ3iV3_clip">
              <path d="M-74.3456,-113.5682 h212.5020576168647 v207.02628833037176 h-212.5020576168647 Z" />
            </clipPath>
          </defs>
          <g
            fill="none"
            stroke="#e085f4"
            strokeWidth="3.5"
            strokeLinejoin="round"
            strokeLinecap="round"
            pointerEvents="none"
          >
            <g
              style={{
                clipPath:
                  'url("#_export_2_r79__shape_o7RIqC3KaMnCPkAPJ3iV3_clip")',
              }}
            >
              <rect
                x="-74.3456"
                y="-113.5682"
                width="212.5021"
                height="207.0263"
                opacity={0}
              />
              <path
                d="M25.65435709585563,-6.541943490895392L38.156414712720334,-13.568231821267135"
                strokeDasharray="none"
                strokeDashoffset="none"
              />
            </g>
            <path d="M 34.65664942733577 -13.60876510656628 L 38.156414712720334 -13.568231821267135 L 36.37142921526015 -10.557612819490783" />
          </g>
        </g>
      </g>
      <g transform="matrix(1, 0, 0, 1, -762.7633, 1836.9633)" opacity={1}>
        <path
          fill="#f9f0e6"
          d="M7,0 L46.5089,0 Q53.5089,0 53.5089,0.3821 L53.5089,1.1463 Q53.5089,1.5285 46.5089,1.5285 L7,1.5285 Q0,1.5285 0,1.1463 L0,0.3821 Q0,0 7,0 "
        />
        <path
          d="M6.9997,0.0683 L45.7926,0.4466 Q52.7922,0.5149 52.9231,0.9584 L53.1848,1.8455 Q53.3157,2.289 46.3179,2.1125 L7.2594,1.1277 Q0.2616,0.9513 0.4051,0.4495 L0.6921,-0.5542 Q0.8356,-1.0561 7.8356,-1.0252 L46.6285,-0.8544 Q53.6285,-0.8236 53.3406,-0.1906 L52.7649,1.0752 Q52.4771,1.7081 45.4779,1.8142 L6.7872,2.4007 Q-0.212,2.5068 -0.4434,2.0198 L-0.9062,1.046 Q-1.1376,0.5591 6.9997,0.0683 "
          stroke="#f1ac4b"
          strokeWidth="3.5"
          fill="none"
        />
      </g>
      <g transform="matrix(1, 0, 0, 1, -837.9376, 1831.8659)" opacity={1}>
        <path
          fill="#ddedfa"
          d="M7,0 L46.5089,0 Q53.5089,0 53.5089,0.3821 L53.5089,1.1463 Q53.5089,1.5285 46.5089,1.5285 L7,1.5285 Q0,1.5285 0,1.1463 L0,0.3821 Q0,0 7,0 "
        />
        <path
          d="M6.9999,0.0282 L47.3614,0.1908 Q54.3614,0.219 53.8725,0.5059 L52.8948,1.0797 Q52.4059,1.3666 45.4064,1.2877 L6.9089,0.8533 Q-0.0907,0.7743 -0.1534,0.4393 L-0.2788,-0.2308 Q-0.3415,-0.5658 6.6583,-0.5154 L47.2576,-0.2232 Q54.2574,-0.1728 54.096,0.0582 L53.7733,0.5201 Q53.6119,0.7511 46.6143,0.9326 L6.9735,1.9608 Q-0.0242,2.1423 0.1204,1.7496 L0.4094,0.9642 Q0.554,0.5715 6.9999,0.0282 "
          stroke="#4ba1f1"
          strokeWidth="3.5"
          fill="none"
        />
      </g>
      <g transform="matrix(1, 0, 0, 1, -767.0745, 1875.6602)" opacity={1}>
        <path
          fill="#e8e8e8"
          d="M7,0 L46.5089,0 Q53.5089,0 53.5089,0.3821 L53.5089,1.1463 Q53.5089,1.5285 46.5089,1.5285 L7,1.5285 Q0,1.5285 0,1.1463 L0,0.3821 Q0,0 7,0 "
        />
        <path
          d="M6.9992,0.1081 L47.1209,0.7276 Q54.1201,0.8357 54.1811,0.9539 L54.3031,1.1903 Q54.3641,1.3085 47.3641,1.3336 L6.6672,1.4798 Q-0.3327,1.5049 -0.244,1.1333 L-0.0667,0.39 Q0.022,0.0183 7.0206,-0.1205 L46.899,-0.9114 Q53.8976,-1.0502 53.7183,-0.5289 L53.3595,0.5137 Q53.1802,1.0349 46.1827,1.2226 L6.6195,2.2835 Q-0.378,2.4711 -0.1386,1.9386 L0.3402,0.8734 Q0.5796,0.3409 6.9992,0.1081 "
          stroke="#1d1d1d"
          strokeWidth="3.5"
          fill="none"
        />
      </g>
      <g transform="matrix(1, 0, 0, 1, -768.2777, 1757.3898)" opacity={1}>
        <g transform="scale(1)">
          <defs>
            <clipPath id="_export_2_r79__shape_WJGTqoKMBGslOPpb-NKxq_clip">
              <path d="M-64.6777,-63.0825 h202.68257181886537 v220.51257524850195 h-202.68257181886537 Z" />
            </clipPath>
          </defs>
          <g
            fill="none"
            stroke="#f1ac4b"
            strokeWidth="3.5"
            strokeLinejoin="round"
            strokeLinecap="round"
            pointerEvents="none"
          >
            <g
              style={{
                clipPath:
                  'url("#_export_2_r79__shape_WJGTqoKMBGslOPpb-NKxq_clip")',
              }}
            >
              <rect
                x="-64.6777"
                y="-63.0825"
                width="202.6826"
                height="220.5126"
                opacity={0}
              />
              <path
                d="M38.00484881260013,36.91754201447907L35.32227699373476,57.430117262981014"
                strokeDasharray="none"
                strokeDashoffset="none"
              />
            </g>
            <path d="M 37.83816958710768 54.145492192419034 L 35.32227699373476 57.430117262981014 L 33.73565453740729 53.60897782864596" />
          </g>
        </g>
      </g>
      <g transform="matrix(1, 0, 0, 1, -770.0395, 1889.1721)" opacity={1}>
        <g transform="scale(1)">
          <defs>
            <clipPath id="_export_2_r79__shape_ujLasinMbwZtW8GO0K3O3_clip">
              <path d="M-137.4953,-195.2226 h201 v216.06158838622008 h-201 Z" />
            </clipPath>
          </defs>
          <g
            className={cn(
              explode
                ? 'translate-y-[-5%] translate-x-[-5%]'
                : 'animate-wiggle-in-place',
            )}
            fill="none"
            stroke="#4ba1f1"
            strokeWidth="3.5"
            strokeLinejoin="round"
            strokeLinecap="round"
            pointerEvents="none"
          >
            <g
              style={{
                clipPath:
                  'url("#_export_2_r79__shape_ujLasinMbwZtW8GO0K3O3_clip")',
              }}
            >
              <rect
                x="-137.4953"
                y="-195.2226"
                width={201}
                height="216.0616"
                opacity={0}
              />
              <path
                d="M-36.64692366396878,-95.2225910701768L-37.495330837605685,-79.16100268395674"
                strokeDasharray="none"
                strokeDashoffset="none"
              />
            </g>
            <path d="M -35.58788149723606 -82.0955617673496 L -37.495330837605685 -79.16100268395674 L -39.083008882545464 -82.28018181084514" />
          </g>
        </g>
      </g>
    </svg>
  );
};

export function Thumbnail({ isHover = false }: ThumbnailProps) {
  return (
    <div
      className="max-w-full max-h-full aspect-3/2! flex flex-col items-center justify-center rounded-2xl"
      style={{
        backgroundPosition: 'center center',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}
    >
      <div
        className={cn(
          isHover && 'scale-110',
          'duration-500 transition-transform h-[80%] w-auto',
        )}
      >
        <MFDiagram
          explode={isHover}
          style={{
            filter: 'drop-shadow(0 0 20px var(--theme-tertiary))',
          }}
        />
      </div>
    </div>
  );
}
