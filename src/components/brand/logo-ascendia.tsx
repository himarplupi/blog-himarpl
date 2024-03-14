"use client";

import { motion } from "framer-motion";

export function LogoAscendia() {
  return (
    <motion.div
      className="flex aspect-square w-64 items-center justify-center overflow-hidden rounded-full bg-white p-10 sm:w-72"
      initial={{ opacity: 0, scale: 0, rotate: 90 }}
      animate={{ opacity: 1, rotate: 0, scale: 1 }}
      transition={{ duration: 3, type: "spring" }}
    >
      <motion.svg
        className="h-full w-full"
        viewBox="0 0 873 1350"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ pathLength: 0, scale: 0, rotate: 90 }}
        animate={{ pathLength: 1, rotate: 0, scale: 1 }}
        transition={{ duration: 8, ease: "backOut" }}
      >
        <g clipPath="url(#clip0_697_2)">
          <Gear />
          <NetworkDots />
          <NeckBlue />
          <NeckYellow />
          <NeckWhite />
          <HeadYellow />
          <HeadBlue />
          <HeadWhite />
        </g>
        <defs>
          <clipPath id="clip0_697_2">
            <rect width="873" height="1350" fill="white" />
          </clipPath>
        </defs>
      </motion.svg>
    </motion.div>
  );
}

function Gear() {
  return (
    <>
      <motion.path
        d="M709.957 676.356C699.919 666.866 695.443 647.479 676.86 656.427C658.277 665.374 671.027 681.372 673.876 695.335C647.363 705.322 618.702 708.219 590.726 703.741C589.641 690.184 601.442 671.611 579.197 666.324C559.935 661.714 558.443 679.88 552.068 692.082C525.772 681.151 503.107 663.009 486.688 639.752C496.997 629.72 516.529 623.89 505.542 605.588C494.555 587.287 481.262 600.979 467.562 604.504C456.797 578.44 453.645 549.859 458.474 522.078L475.158 524.247C477.385 524.889 479.716 525.087 482.019 524.828C484.322 524.569 486.552 523.859 488.58 522.738C490.608 521.618 492.395 520.109 493.84 518.297C495.284 516.486 496.357 514.407 496.997 512.181C498.319 507.92 497.908 503.31 495.851 499.351C493.794 495.391 490.258 492.402 486.01 491.032C480.991 488.863 476.243 486.558 470.411 483.847C481.825 458.173 500.137 436.165 523.312 420.265C533.349 429.755 537.825 449.141 556.544 439.652C575.263 430.162 562.512 415.385 559.393 401.421C585.917 390.906 614.828 387.903 642.949 392.744C642.135 406.301 632.911 423.654 652.58 429.755C672.248 435.856 674.282 416.876 681.607 404.675C707.842 415.515 730.464 433.565 746.852 456.733C736.407 466.63 716.874 472.188 727.726 490.761C738.577 509.334 752.006 495.37 765.842 491.846C776.484 517.8 779.587 546.228 774.794 573.865C761.23 574.814 743.189 564.511 736.95 583.626C730.71 602.741 750.514 605.182 762.586 612.502C751.363 638.287 733.129 660.409 709.957 676.356ZM705.345 575.356C712.709 552.557 710.805 527.777 700.045 506.369C689.284 484.961 670.529 468.641 647.832 460.936C624.121 452.79 598.15 454.347 575.584 465.268C553.018 476.19 535.69 495.588 527.381 519.231C520.077 542.656 522.375 568.02 533.768 589.753C545.162 611.487 564.721 627.811 588.149 635.143C611.625 642.595 637.094 640.498 659.033 629.306C680.972 618.114 697.612 598.73 705.345 575.356Z"
        fill="#26306E"
        initial={{ pathLength: 0, scale: 0 }}
        animate={{ pathLength: 1, rotate: 360 * 4, scale: 1 }}
        transition={{ duration: 6, ease: "backOut" }}
      />
      <motion.path
        d="M632.097 628.906C681.091 628.906 720.808 589.089 720.808 539.973C720.808 490.856 681.091 451.039 632.097 451.039C583.104 451.039 543.387 490.856 543.387 539.973C543.387 589.089 583.104 628.906 632.097 628.906Z"
        fill="#FFCE3A"
        initial={{ pathLength: 0, scale: 0 }}
        animate={{ pathLength: 1, scale: 1 }}
        transition={{ duration: 6, ease: "anticipate" }}
      />
    </>
  );
}

function NetworkDots() {
  return (
    <>
      <motion.path
        d="M442.875 655.749C453.363 655.749 461.865 647.373 461.865 637.041C461.865 626.708 453.363 618.332 442.875 618.332C432.387 618.332 423.885 626.708 423.885 637.041C423.885 647.373 432.387 655.749 442.875 655.749Z"
        fill="#FFCE3A"
        initial={{ pathLength: 0, scale: 0 }}
        animate={{ pathLength: 1, rotate: 360, scale: 1 }}
        transition={{
          delay: 5,
          duration: 2,
          ease: "easeIn",
          type: "spring",
        }}
      />
      <motion.path
        d="M442.875 637.041L344.669 681.507"
        stroke="#FFCE3A"
        strokeWidth="1.36"
        strokeMiterlimit="10"
        initial={{ pathLength: 0, scale: 0 }}
        animate={{ pathLength: 1, scale: 1 }}
        transition={{
          delay: 5,
          duration: 2,
          ease: "easeIn",
          type: "spring",
        }}
      />
      <motion.path
        d="M442.875 645.581C447.67 645.581 451.556 641.758 451.556 637.041C451.556 632.324 447.67 628.5 442.875 628.5C438.081 628.5 434.194 632.324 434.194 637.041C434.194 641.758 438.081 645.581 442.875 645.581Z"
        fill="#26306E"
        initial={{ pathLength: 0, scale: 0 }}
        animate={{ pathLength: 1, scale: 1 }}
        transition={{
          delay: 5,
          duration: 2,
          ease: "easeIn",
          type: "spring",
        }}
      />
      <motion.path
        d="M560.071 748.75C570.559 748.75 579.061 740.374 579.061 730.041C579.061 719.709 570.559 711.333 560.071 711.333C549.583 711.333 541.081 719.709 541.081 730.041C541.081 740.374 549.583 748.75 560.071 748.75Z"
        fill="#26306E"
        initial={{ pathLength: 0, scale: 0 }}
        animate={{ pathLength: 1, scale: 1 }}
        transition={{
          delay: 5,
          duration: 2,
          ease: "easeIn",
          type: "spring",
        }}
      />
      <motion.path
        d="M518.971 864.526L558.714 733.295"
        stroke="#26306E"
        strokeWidth="1.36"
        strokeMiterlimit="10"
        initial={{ pathLength: 0, scale: 0 }}
        animate={{ pathLength: 1, scale: 1 }}
        transition={{
          delay: 5,
          duration: 2,
          ease: "easeIn",
          type: "spring",
        }}
      />
      <motion.path
        d="M560.071 738.582C564.866 738.582 568.752 734.758 568.752 730.041C568.752 725.324 564.866 721.5 560.071 721.5C555.277 721.5 551.39 725.324 551.39 730.041C551.39 734.758 555.277 738.582 560.071 738.582Z"
        fill="#FFCE3A"
        initial={{ pathLength: 0, scale: 0 }}
        animate={{ pathLength: 1, scale: 1 }}
        transition={{
          delay: 5,
          duration: 2,
          ease: "easeIn",
          type: "spring",
        }}
      />
      <motion.path
        d="M422.393 510.961C432.881 510.961 441.383 502.585 441.383 492.252C441.383 481.92 432.881 473.544 422.393 473.544C411.905 473.544 403.403 481.92 403.403 492.252C403.403 502.585 411.905 510.961 422.393 510.961Z"
        fill="#26306E"
        initial={{ pathLength: 0, scale: 0 }}
        animate={{ pathLength: 1, scale: 1 }}
        transition={{
          delay: 5,
          duration: 2,
          ease: "easeIn",
          type: "spring",
        }}
      />
      <motion.path
        d="M328.664 475.713L405.166 489.134"
        stroke="#26306E"
        strokeWidth="1.36"
        strokeMiterlimit="10"
        initial={{ pathLength: 0, scale: 0 }}
        animate={{ pathLength: 1, scale: 1 }}
        transition={{
          delay: 5,
          duration: 2,
          ease: "easeIn",
          type: "spring",
        }}
      />
      <motion.path
        d="M422.393 500.793C427.188 500.793 431.074 496.969 431.074 492.252C431.074 487.535 427.188 483.712 422.393 483.712C417.599 483.712 413.712 487.535 413.712 492.252C413.712 496.969 417.599 500.793 422.393 500.793Z"
        fill="#FFCE3A"
        initial={{ pathLength: 0, scale: 0 }}
        animate={{ pathLength: 1, scale: 1 }}
        transition={{
          delay: 5,
          duration: 2,
          ease: "easeIn",
          type: "spring",
        }}
      />
    </>
  );
}

function NeckBlue() {
  return (
    <>
      <motion.path
        d="M323.374 435.72C218.521 588.371 206.585 733.973 260.706 893.809C290.819 982.742 272.1 1072.76 195.869 1167.39C288.242 1151.53 415.475 1008.37 417.239 907.366C417.711 877.796 414.476 848.283 407.608 819.517C353.758 697.369 244.158 581.999 323.374 435.72Z"
        fill="#26306E"
        initial={{ pathLength: 0, rotate: 90, scale: 0 }}
        animate={{ pathLength: 1, rotate: 0, scale: 1 }}
        transition={{
          delay: 1,
          duration: 2,
          ease: "easeInOut",
          type: "spring",
        }}
      />
      <motion.path
        d="M389.703 310.996C247.413 410.911 168.333 570.34 235.612 748.614C268.709 836.463 245.243 929.735 157.617 1023.28C260.435 994.266 357.691 876.185 359.455 775.321C359.994 745.748 356.758 716.227 349.824 687.472C318.626 558.681 310.216 457.276 389.703 310.996Z"
        fill="#26306E"
        initial={{ pathLength: 0, rotate: 90, scale: 0 }}
        animate={{ pathLength: 1, rotate: 0, scale: 1 }}
        transition={{
          delay: 1,
          duration: 2,
          ease: "easeInOut",
          type: "spring",
        }}
      />
      <motion.path
        d="M323.238 547.836C268.981 712.824 267.76 878.761 377.495 1004.43C438.67 1074.39 464.443 1153.56 406.93 1261.2C500.252 1200.33 545.693 1082.39 513.138 992.504C503.317 965.86 489.9 940.683 473.259 917.669C397.435 812.603 332.055 690.048 323.238 547.836Z"
        fill="#26306E"
        initial={{ pathLength: 0, rotate: 90, scale: 0 }}
        animate={{ pathLength: 1, rotate: 0, scale: 1 }}
        transition={{
          delay: 1,
          duration: 2,
          ease: "easeInOut",
          type: "spring",
        }}
      />
      <motion.path
        d="M366.237 732.075C378.309 890.962 411.949 1071 574.314 1140.41C664.652 1179.45 728.947 1212.53 720.944 1329.39C800.295 1258.63 800.295 1111.67 730.575 1046.73C709.225 1027.06 685.372 1010.28 659.633 996.842C539.996 933.666 396.485 871.847 366.237 732.075Z"
        fill="#26306E"
        initial={{ pathLength: 0, rotate: 90, scale: 0 }}
        animate={{ pathLength: 1, rotate: 0, scale: 1 }}
        transition={{
          delay: 1,
          duration: 2,
          ease: "easeInOut",
          type: "spring",
        }}
      />
      <motion.path
        d="M360.133 718.518C401.775 867.644 488.316 995.486 666.415 1035.89C766.113 1058.39 836.648 1104.62 842.752 1212.13C898.501 1121.97 874.763 1012.3 791.343 961.323C765.821 945.862 738.485 933.613 709.957 924.854C575.534 883.777 417.239 847.173 360.133 718.518Z"
        fill="#26306E"
        initial={{ pathLength: 0, rotate: 90, scale: 0 }}
        animate={{ pathLength: 1, rotate: 0, scale: 1 }}
        transition={{
          delay: 1,
          duration: 2,
          ease: "easeInOut",
          type: "spring",
        }}
      />
      <motion.path
        d="M277.797 695.878C258.4 860.459 307.774 1003.89 422.393 1115.33C489.401 1180.54 544.472 1238.43 510.154 1350C591.54 1275.71 612.158 1156.68 558.714 1078.86C542.381 1055.67 522.99 1034.78 501.066 1016.77C400.012 932.311 318.897 839.717 277.797 695.878Z"
        fill="#26306E"
        initial={{ pathLength: 0, rotate: 90, scale: 0 }}
        animate={{ pathLength: 1, rotate: 0, scale: 1 }}
        transition={{
          delay: 1,
          duration: 2,
          ease: "easeInOut",
          type: "spring",
        }}
      />
    </>
  );
}

function NeckYellow() {
  return (
    <>
      <motion.path
        d="M362.032 326.315C219.742 426.23 140.662 585.524 207.941 763.798C241.038 851.647 229.101 935.835 141.476 1029.38C244.7 993.995 330.02 891.504 331.376 790.505C331.909 760.932 328.672 731.412 321.746 702.656C290.955 573.865 282.545 472.595 362.032 326.315Z"
        fill="#FFCE3A"
        initial={{ pathLength: 0, scale: 0, rotate: 90 }}
        animate={{ pathLength: 1, rotate: 0, scale: 1 }}
        transition={{
          delay: 1.5,
          duration: 2,
          ease: "easeInOut",
          type: "spring",
        }}
      />
      <motion.path
        d="M300.043 563.02C245.107 728.143 247.142 894.758 356.742 1019.62C417.917 1089.71 441.926 1170.1 383.87 1278.01C477.057 1217.14 524.397 1097.57 492.385 1007.82C482.56 981.139 469.144 955.917 452.506 932.853C376.817 827.787 308.86 704.961 300.043 563.02Z"
        fill="#FFCE3A"
        initial={{ pathLength: 0, scale: 0, rotate: 90 }}
        animate={{ pathLength: 1, rotate: 0, scale: 1 }}
        transition={{
          delay: 1.5,
          duration: 2,
          ease: "easeInOut",
          type: "spring",
        }}
      />
      <motion.path
        d="M332.462 734.244C374.104 883.37 459.831 1010.81 638.744 1051.21C738.442 1073.71 826.746 1119.94 832.985 1227.45C888.599 1137.29 846.55 1027.62 763.672 976.642C738.121 961.235 710.792 948.989 682.286 940.174C547.727 898.961 389.567 862.357 332.462 734.244Z"
        fill="#FFCE3A"
        initial={{ pathLength: 0, scale: 0, rotate: 90 }}
        animate={{ pathLength: 1, rotate: 0, scale: 1 }}
        transition={{
          delay: 1.5,
          duration: 2,
          ease: "easeInOut",
          type: "spring",
        }}
      />
      <motion.path
        d="M322.56 685.845C304.248 850.969 351.723 997.655 469.461 1110.31C538.097 1176.2 544.608 1238.29 510.154 1350C592.897 1275.98 663.024 1153.29 607.817 1074.79C591.006 1051.16 571.118 1029.87 548.677 1011.48C445.045 926.481 334.496 752.817 322.56 685.845Z"
        fill="#FFCE3A"
        initial={{ pathLength: 0, scale: 0, rotate: 90 }}
        animate={{ pathLength: 1, rotate: 0, scale: 1 }}
        transition={{
          delay: 1.5,
          duration: 2,
          ease: "easeInOut",
          type: "spring",
        }}
      />
    </>
  );
}

function NeckWhite() {
  return (
    <>
      <motion.path
        d="M295.702 450.904C190.85 603.555 211.468 736.413 265.589 895.842C295.838 984.776 287.699 1071.13 200.074 1164.68C303.298 1129.29 387.804 1023.55 389.974 922.55C389.496 892.817 385.304 863.26 377.495 834.565C303.434 718.518 216.08 597.183 295.702 450.904Z"
        fill="white"
        initial={{ pathLength: 0, scale: 0, rotate: 45 }}
        animate={{ pathLength: 1, rotate: 0, scale: 1 }}
        transition={{
          delay: 2,
          duration: 2,
          ease: "easeInOut",
          type: "spring",
        }}
      />
      <motion.path
        d="M330.698 737.904C342.77 896.791 408.151 1049.71 570.651 1118.58C661.125 1157.08 736.136 1215.92 722.165 1327.22C753.289 1288.84 768.62 1240.04 765.043 1190.76C761.465 1141.48 739.247 1095.41 702.903 1061.92C681.518 1042.28 657.671 1025.51 631.962 1012.03C512.189 948.986 361.354 877.812 330.698 737.904Z"
        fill="white"
        initial={{ pathLength: 0, scale: 0, rotate: 45 }}
        animate={{ pathLength: 1, rotate: 0, scale: 1 }}
        transition={{
          delay: 2,
          duration: 2,
          ease: "easeInOut",
          type: "spring",
        }}
      />
    </>
  );
}

function HeadYellow() {
  return (
    <>
      <motion.path
        d="M750.378 905.875C847.77 762.849 831.764 609.249 738.035 442.905C690.424 357.768 474.751 201.998 492.385 72.5296C389.703 122.826 577.976 366.037 612.429 460.936C622.669 488.778 636.338 515.237 653.122 539.702C728.269 649.513 773.167 741.293 750.378 905.875Z"
        fill="#FFCE3A"
        initial={{ pathLength: 0, scale: 0, rotate: 90 }}
        animate={{ pathLength: 1, rotate: 0, scale: 1 }}
        transition={{
          delay: 3,
          duration: 2,
          ease: "easeInOut",
          type: "spring",
        }}
      />
      <motion.path
        d="M727.862 661.172C720.13 488.05 670.213 310.725 520.599 235.077C439.213 194.406 398.52 106.422 408.693 0C330.427 71.3095 328.392 238.195 391.06 310.861C409.766 332.464 431.355 351.394 455.219 367.122C563.598 439.109 668.721 531.161 727.862 661.172Z"
        fill="#FFCE3A"
        initial={{ pathLength: 0, scale: 0, rotate: 90 }}
        animate={{ pathLength: 1, rotate: 0, scale: 1 }}
        transition={{
          delay: 3,
          duration: 2,
          ease: "easeInOut",
          type: "spring",
        }}
      />
      <motion.path
        d="M622.196 503.64C554.374 359.123 450.471 214.2 273.728 215.013C185.153 215.013 116.518 181.527 75.5533 72.5296C37.3019 157.532 57.5128 255.006 168.062 335.805C190.986 352.616 223.133 354.107 252.432 357.903C386.99 375.392 543.387 383.39 622.196 503.64Z"
        fill="#FFCE3A"
        initial={{ pathLength: 0, scale: 0, rotate: 90 }}
        animate={{ pathLength: 1, rotate: 0, scale: 1 }}
        transition={{
          delay: 3,
          duration: 2,
          ease: "easeInOut",
          type: "spring",
        }}
      />
      <motion.path
        d="M632.097 513.808C539.724 388.677 413.848 299.337 231.95 324.011C130.624 337.568 48.1533 318.859 3.6623 220.029C-16.1416 323.74 45.3048 418.096 141.611 436.94C171.153 442.491 201.27 444.358 231.272 442.498C371.527 434.5 532.671 413.758 632.097 513.808Z"
        fill="#FFCE3A"
        initial={{ pathLength: 0, scale: 0, rotate: 90 }}
        animate={{ pathLength: 1, rotate: 0, scale: 1 }}
        transition={{
          delay: 3,
          duration: 2,
          ease: "easeInOut",
          type: "spring",
        }}
      />
      <motion.path
        d="M661.397 551.903C620.704 391.253 522.905 274.257 375.732 209.726C289.734 171.902 217.029 137.061 209.705 20.6065C159.652 118.623 183.39 237.518 261.385 291.745C284.957 307.931 310.596 320.88 337.616 330.247C462.272 373.223 571.329 431.653 661.397 551.903Z"
        fill="#FFCE3A"
        initial={{ pathLength: 0, scale: 0, rotate: 90 }}
        animate={{ pathLength: 1, rotate: 0, scale: 1 }}
        transition={{
          delay: 3,
          duration: 2,
          ease: "easeInOut",
          type: "spring",
        }}
      />
    </>
  );
}

function HeadBlue() {
  return (
    <>
      <motion.path
        d="M761.501 888.657C858.893 745.632 831.222 587.829 738.035 421.35C690.424 336.348 462.001 195.22 498.353 65.2089C400.69 128.249 577.976 344.346 612.429 439.516C622.697 467.346 636.365 493.801 653.122 518.282C728.269 628.093 783.611 724.212 761.501 888.657Z"
        fill="#26306E"
        initial={{ pathLength: 0, scale: 0, rotate: 90 }}
        animate={{ pathLength: 1, rotate: 0, scale: 1 }}
        transition={{
          delay: 3.5,
          duration: 2,
          ease: "easeInOut",
          type: "spring",
        }}
      />
      <motion.path
        d="M632.098 492.252C539.724 367.257 413.848 277.917 231.95 302.455C130.625 316.012 50.3237 297.304 5.96835 198.474C-13.8356 302.184 45.3049 396.54 141.612 415.385C171.153 420.935 201.27 422.802 231.272 420.943C371.527 412.944 532.671 392.338 632.098 492.252Z"
        fill="#26306E"
        initial={{ pathLength: 0, scale: 0, rotate: 90 }}
        animate={{ pathLength: 1, rotate: 0, scale: 1 }}
        transition={{
          delay: 3.5,
          duration: 2,
          ease: "easeInOut",
          type: "spring",
        }}
      />
      <motion.path
        d="M660.854 532.245C620.161 371.46 522.905 252.701 376.003 188.17C289.734 150.482 225.846 118.894 218.386 2.30469C168.333 100.321 183.39 215.42 261.385 269.648C284.952 285.876 310.591 298.871 337.616 308.285C462.272 352.48 570.922 411.86 660.854 532.245Z"
        fill="#26306E"
        initial={{ pathLength: 0, scale: 0, rotate: 90 }}
        animate={{ pathLength: 1, rotate: 0, scale: 1 }}
        transition={{
          delay: 3.5,
          duration: 2,
          ease: "easeInOut",
          type: "spring",
        }}
      />
    </>
  );
}

function HeadWhite() {
  return (
    <>
      <motion.path
        d="M727.862 643.819C720.13 470.29 661.261 310.725 513.681 231.281C431.481 186.95 392.958 122.826 408.015 0.813416C342.635 90.4248 328.392 216.911 391.059 289.441C409.807 311.003 431.389 329.929 455.219 345.702C563.598 417.689 667.907 512.181 727.862 643.819Z"
        fill="white"
        initial={{ pathLength: 0, scale: 0, rotate: 45 }}
        animate={{ pathLength: 1, rotate: 0, scale: 1 }}
        transition={{
          delay: 4,
          duration: 2,
          ease: "easeInOut",
          type: "spring",
        }}
      />
      <motion.path
        d="M622.196 486.016C553.967 341.499 448.301 225.452 271.287 216.911C173.216 212.844 102.275 183.425 75.5533 74.4276C40.693 176.918 79.487 279.68 168.062 316.283C195.112 327.373 223.462 334.981 252.432 338.923C386.99 355.87 526.025 371.189 622.196 486.016Z"
        fill="white"
        initial={{ pathLength: 0, scale: 0, rotate: 45 }}
        animate={{ pathLength: 1, rotate: 0, scale: 1 }}
        transition={{
          delay: 4,
          duration: 2,
          ease: "easeInOut",
          type: "spring",
        }}
      />
    </>
  );
}
