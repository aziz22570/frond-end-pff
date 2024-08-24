// File path: ./utils/getScreenShare.js

export const getScreenShare = async () => {
  try {
    const screenStream = await navigator.mediaDevices.getDisplayMedia({
      video: true,audio: true
    });
    return screenStream;
  } catch (error) {
    console.error("Error accessing display media.", error);
    throw error;
  }
};
