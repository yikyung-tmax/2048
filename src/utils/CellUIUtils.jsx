export const getCellColour = (value) => {
    switch (value) {
      case 2: return { background: "#EEE4DA", font: "#776E65", size: "55px" };
      case 4: return { background: "#EDE0C8", font: "#776E65", size: "55px" };
      case 8: return { background: "#F2B179", font: "#F9F6F2", size: "55px" };
      case 16: return { background: "#F59563", font: "#F9F6F2", size: "55px" };
      case 32: return { background: "#F67C5F", font: "#F9F6F2", size: "55px" };
      case 64: return { background: "#F65E3B", font: "#F9F6F2", size: "55px" };
      case 128: return { background: "#EDCF72", font: "#F9F6F2", size: "45px" };
      case 256: return { background: "#EDCC61", font: "#F9F6F2", size: "45px" };
      case 512: return { background: "#EDC850", font: "#F9F6F2", size: "45px" };
      case 1024: return { background: "#EDC53F", font: "#F9F6F2", size: "35px" };
      case 2048: return { background: "#EDC22E", font: "#F9F6F2", size: "35px" };
      default: return { background: "#EEE4DA59", font: "white", size: "55px" };

    }
  }
