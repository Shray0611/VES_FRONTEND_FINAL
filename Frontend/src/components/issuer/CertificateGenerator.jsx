import React, { useState, useRef, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { read, utils } from "xlsx";
import { saveAs } from "file-saver";
import { useNavigate, useLocation } from "react-router-dom";
import QRCode from "qrcode";
import IssuerNavbar from "../layout/IssuerNavbar";
import "./CertificateGenerator.css";

const CertificateGenerator = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [template, setTemplate] = useState(null);
  const [variables, setVariables] = useState([]);
  const [currentVar, setCurrentVar] = useState("");
  const [excelData, setExcelData] = useState([]);
  const [userInput, setUserInput] = useState({});
  const [previewCertificate, setPreviewCertificate] = useState(null);
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [qrEnabled, setQrEnabled] = useState(false);
  const [qrConfig, setQrConfig] = useState({
    x: 50,
    y: 50,
    width: 100,
    height: 100,
  });
  const [qrDataUrl, setQrDataUrl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [currentDragIndex, setCurrentDragIndex] = useState(null);
  const [isDraggingQR, setIsDraggingQR] = useState(false);
  const [startDragPos, setStartDragPos] = useState({ x: 0, y: 0 });
  const [eventName, setEventName] = useState("");

  const imgRef = useRef(null);
  const containerRef = useRef(null);

  const fontOptions = [
    "Arial",
    "Times New Roman",
    "Courier New",
    "Verdana",
    "Helvetica",
    "Georgia",
    "Great Vibes",
    "Playfair Display",
    "Dancing Script",
    "Cinzel",
    "Lobster",
    "Pacifico",
    "Merriweather",
    "Cormorant Garamond",
    "Sacramento",
    "Alex Brush",
    "Allura",
    "Libre Baskerville",
    "EB Garamond",
    "Noto Serif",
    "Raleway",
    "Pinyon Script",
    "Kaushan Script",
    "Amiri",
    "Montserrat",
  ];

  // Handle incoming templates from location.state
  useEffect(() => {
    const loadTemplateFromState = async () => {
      if (location.state?.selectedTemplate) {
        try {
          if (location.state.selectedTemplate.startsWith("blob:")) {
            setTemplate(location.state.selectedTemplate);
          } else {
            const response = await fetch(location.state.selectedTemplate);
            const blob = await response.blob();
            const reader = new FileReader();
            reader.onloadend = () => setTemplate(reader.result);
            reader.readAsDataURL(blob);
          }
        } catch (error) {
          console.error("Error loading template:", error);
          alert("Failed to load template image");
        }
      }
    };

    loadTemplateFromState();
  }, [location.state]);

  // Update image dimensions on template load or resize
  useEffect(() => {
    if (imgRef.current) {
      const observer = new ResizeObserver(() => {
        if (
          imgRef.current &&
          imgRef.current.offsetWidth &&
          imgRef.current.offsetHeight
        ) {
          setImageDimensions({
            width: imgRef.current.offsetWidth,
            height: imgRef.current.offsetHeight,
          });
        }
      });
      observer.observe(imgRef.current);
      return () => observer.disconnect();
    }
  }, [template]);

  useEffect(() => {
    if (template && imgRef.current) {
      const img = imgRef.current;
      const updateDimensions = () => {
        if (img.offsetWidth && img.offsetHeight) {
          setImageDimensions({
            width: img.offsetWidth,
            height: img.offsetHeight,
          });
        }
      };

      img.addEventListener("load", updateDimensions);
      updateDimensions();
      return () => {
        img.removeEventListener("load", updateDimensions);
      };
    }
  }, [template]);

  // Generate sample QR code for preview
  useEffect(() => {
    if (qrEnabled) {
      QRCode.toDataURL("https://ves.ac.in/sample-certificate-verification")
        .then((url) => {
          setQrDataUrl(url);
        })
        .catch((err) => {
          console.error("QR code generation error:", err);
        });
    }
  }, [qrEnabled]);

  // Handle dragging of variables and QR code
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging && !isDraggingQR) return;
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - containerRect.left;
      const mouseY = e.clientY - containerRect.top;

      const deltaX = mouseX - startDragPos.x;
      const deltaY = mouseY - startDragPos.y;

      if (isDragging && currentDragIndex !== null) {
        const newX = Math.max(
          0,
          Math.min(100, (mouseX / containerRect.width) * 100)
        );
        const newY = Math.max(
          0,
          Math.min(100, (mouseY / containerRect.height) * 100)
        );

        setVariables((prev) =>
          prev.map((v, i) =>
            i === currentDragIndex ? { ...v, x: newX, y: newY } : v
          )
        );
      } else if (isDraggingQR) {
        const newX = Math.max(
          0,
          Math.min(100, (mouseX / containerRect.width) * 100)
        );
        const newY = Math.max(
          0,
          Math.min(100, (mouseY / containerRect.height) * 100)
        );

        setQrConfig((prev) => ({ ...prev, x: newX, y: newY }));
      }

      setStartDragPos({ x: mouseX, y: mouseY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsDraggingQR(false);
      setCurrentDragIndex(null);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, isDraggingQR, currentDragIndex, startDragPos, variables]);

  const startDragging = (index, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - containerRect.left;
    const mouseY = e.clientY - containerRect.top;

    setIsDragging(true);
    setCurrentDragIndex(index);
    setStartDragPos({ x: mouseX, y: mouseY });
  };

  const startDraggingQR = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const mouseX =
      e.clientX - containerRef.current.getBoundingClientRect().left;
    const mouseY = e.clientY - containerRef.current.getBoundingClientRect().top;

    setIsDraggingQR(true);
    setStartDragPos({ x: mouseX, y: mouseY });
  };

  const {
    getRootProps: getTemplateRootProps,
    getInputProps: getTemplateInputProps,
  } = useDropzone({
    accept: { "image/*": [".png", ".jpg", ".jpeg"] },
    onDrop: (files) => {
      if (files && files.length > 0) {
        const file = files[0];
        const reader = new FileReader();

        reader.onload = () => {
          const img = new Image();
          img.onload = () => {
            setTemplate(reader.result);
          };
          img.onerror = () => {
            alert("Failed to load the image. Please try a different file.");
          };
          img.src = reader.result;
        };

        reader.onerror = () => {
          alert("Failed to read the file. Please try again.");
        };

        reader.readAsDataURL(file);
      }
    },
  });

  const { getRootProps: getExcelRootProps, getInputProps: getExcelInputProps } =
    useDropzone({
      accept: {
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
          ".xlsx",
        ],
      },
      onDrop: async (files) => {
        const file = await files[0].arrayBuffer();
        const wb = read(file);
        const data = utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
        if (!data[0]?.email) alert("Excel file must contain an email column");
        else setExcelData(data);
      },
    });

  const addVariable = () => {
    if (!currentVar) return;
    setVariables((prev) => [
      ...prev,
      {
        type: "text",
        name: currentVar,
        x: 10,
        y: 10,
        fontSize: 24,
        fontFamily: "Arial",
        color: "#000000",
      },
    ]);
    setCurrentVar("");
  };

  const addQRVariable = () => {
    setVariables((prev) => [
      ...prev,
      { type: "qr", name: "qrCode", x: 10, y: 10, size: 10 },
    ]);
  };

  const updateVariableProperty = (index, property, value) => {
    setVariables((prev) =>
      prev.map((v, i) => (i === index ? { ...v, [property]: value } : v))
    );
  };

  const deleteVariable = (index) => {
    setVariables((prev) => prev.filter((_, i) => i !== index));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInput((prev) => ({ ...prev, [name]: value }));
  };

  const generatePreview = async () => {
    if (!template) return;

    const img = await loadImage(template);
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(img, 0, 0);
    ctx.textBaseline = "top";

    for (const variable of variables) {
      if (variable.type === "text") {
        const { name, x, y, fontSize, fontFamily, color } = variable;
        const posX = (x / 100) * canvas.width;
        const posY = (y / 100) * canvas.height;
        ctx.font = `${fontSize}px ${fontFamily}`;
        ctx.fillStyle = color;
        ctx.fillText(userInput[name] || "", posX, posY);
      } else if (variable.type === "qr") {
        try {
          const { x, y, size } = variable;
          const posX = (x / 100) * canvas.width;
          const posY = (y / 100) * canvas.height;
          const qrSize = (size / 100) * canvas.width;

          const verificationUrl = "https://ves.ac.in/verify/sample";
          const qrDataUrl = await QRCode.toDataURL(verificationUrl);
          const qrImg = await loadImage(qrDataUrl);

          ctx.drawImage(qrImg, posX, posY, qrSize, qrSize);
        } catch (err) {
          console.error("Failed to draw QR code in preview:", err);
        }
      }
    }

    if (qrEnabled && qrDataUrl) {
      try {
        const qrImg = await loadImage(qrDataUrl);
        const posX = (qrConfig.x / 100) * canvas.width;
        const posY = (qrConfig.y / 100) * canvas.height;
        ctx.drawImage(qrImg, posX, posY, qrConfig.width, qrConfig.height);
      } catch (err) {
        console.error("Failed to draw enabled QR code in preview:", err);
      }
    }

    setPreviewCertificate(canvas.toDataURL("image/png"));
  };

  const generateCertificates = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to generate certificates.");
        navigate("/login");
        return;
      }

      let certificateVariables = [...variables];

      if (qrEnabled && !variables.some((v) => v.type === "qr")) {
        console.log("Adding QR code configuration as a variable");
        certificateVariables.push({
          type: "qr",
          name: "qrCode",
          x: qrConfig.x,
          y: qrConfig.y,
          size: (qrConfig.width / imageDimensions.width) * 100,
        });
      }

      const payload = {
        image: template,
        variables: certificateVariables,
        excelData: excelData,
        qrConfig: qrEnabled
          ? {
              enabled: true,
              ...qrConfig,
            }
          : { enabled: false },
        eventName,
      };

      console.log("Sending certificate generation request with payload:", {
        templateIncluded: !!payload.image,
        variablesCount: payload.variables.length,
        qrVariablesCount: payload.variables.filter((v) => v.type === "qr")
          .length,
        excelDataRows: payload.excelData.length,
      });

      const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const response = await fetch(`${baseUrl}/api/templates`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const responseData = await response.json().catch(() => ({}));
        console.error("Error response from server:", responseData);
        throw new Error(
          responseData.message ||
            responseData.error ||
            `Failed to generate certificates: ${response.status} ${response.statusText}`
        );
      }

      const responseData = await response.json();
      alert("Certificates generated successfully!");
      console.log("Certificates generated successfully:", responseData);
      navigate("/issuer-records");
    } catch (error) {
      console.error("Certificate generation error:", error);
      alert("Error generating certificates: " + error.message);
    }
  };

  const loadImage = (src) =>
    new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.src = src;
    });

  const exportConfig = () => {
    const config = { variables };
    if (qrEnabled) {
      config.qrConfig = qrConfig;
    }
    const blob = new Blob([JSON.stringify(config)], {
      type: "application/json",
    });
    saveAs(blob, "certificate-config.json");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("userName");
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9f3e8] to-[#f1d5a4]">
      <IssuerNavbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#5f4b32]">
            Certificate Generator
          </h1>
          <p className="text-gray-600 mt-2">
            Create beautiful certificates with customizable fields and QR codes
          </p>
          <div className="mt-4">
            <label className="block text-lg font-medium text-[#5f4b32] mb-1">
              Event Name
            </label>
            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              placeholder="Enter event name (e.g. Annual Day 2024)"
              className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e0c9a9] focus:border-[#d4b88f] outline-none"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-[#5f4b32] mb-4">
            Upload Certificate Template
          </h2>
          <div
            {...getTemplateRootProps()}
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-[#e0c9a9] transition-colors"
          >
            <input {...getTemplateInputProps()} />
            <p className="text-gray-500">
              Drag & drop certificate template image, or click to select
            </p>
            <p className="text-sm text-gray-400 mt-2">(PNG, JPG, JPEG)</p>
          </div>
        </div>

        {template && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-[#5f4b32] mb-4">
              Design Certificate
            </h2>
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full lg:w-2/3 relative">
                <div
                  ref={containerRef}
                  className="border border-gray-200 rounded-lg p-1 bg-gray-50 relative"
                >
                  <img
                    ref={imgRef}
                    src={template}
                    alt="Template Preview"
                    className="w-full h-auto rounded-lg"
                  />
                  {variables.map((varConfig, index) => {
                    const xPixel = (varConfig.x / 100) * imageDimensions.width;
                    const yPixel = (varConfig.y / 100) * imageDimensions.height;
                    return varConfig.type === "text" ? (
                      <div
                        key={index}
                        className="draggable-element"
                        style={{
                          position: "absolute",
                          left: xPixel + "px",
                          top: yPixel + "px",
                          border: "2px dashed #e0c9a9",
                          padding: "5px",
                          backgroundColor: "rgba(255, 255, 255, 0.7)",
                          cursor: "move",
                          fontFamily: varConfig.fontFamily,
                          fontSize: `${varConfig.fontSize}px`,
                          color: varConfig.color,
                          zIndex: 10,
                          userSelect: "none",
                          WebkitUserSelect: "none",
                        }}
                        onMouseDown={(e) => startDragging(index, e)}
                      >
                        {varConfig.name}
                      </div>
                    ) : (
                      <div
                        key={index}
                        className="draggable-element"
                        style={{
                          position: "absolute",
                          left: xPixel + "px",
                          top: yPixel + "px",
                          border: "2px dashed #e0c9a9",
                          backgroundColor: "rgba(255, 255, 255, 0.7)",
                          cursor: "move",
                          width: `${
                            (varConfig.size / 100) * imageDimensions.width
                          }px`,
                          height: `${
                            (varConfig.size / 100) * imageDimensions.width
                          }px`,
                          zIndex: 10,
                          userSelect: "none",
                          WebkitUserSelect: "none",
                        }}
                        onMouseDown={(e) => startDragging(index, e)}
                      >
                        [QR Code]
                      </div>
                    );
                  })}
                  {qrEnabled && qrDataUrl && (
                    <img
                      src={qrDataUrl}
                      alt="QR Code"
                      className="draggable-element"
                      style={{
                        position: "absolute",
                        left: (qrConfig.x / 100) * imageDimensions.width + "px",
                        top: (qrConfig.y / 100) * imageDimensions.height + "px",
                        width: qrConfig.width + "px",
                        height: qrConfig.height + "px",
                        cursor: "move",
                        zIndex: 10,
                        userSelect: "none",
                        WebkitUserSelect: "none",
                      }}
                      onMouseDown={startDraggingQR}
                    />
                  )}
                </div>
                <div className="mt-2 text-center text-sm text-gray-500">
                  <p>Drag to position elements on the certificate</p>
                </div>
              </div>

              <div className="w-full lg:w-1/3">
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <input
                      type="text"
                      value={currentVar}
                      onChange={(e) => setCurrentVar(e.target.value)}
                      placeholder="New variable name"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e0c9a9] focus:border-[#d4b88f] outline-none"
                    />
                    <button
                      onClick={addVariable}
                      className="bg-[#5f4b32] hover:bg-[#4a3a27] text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      Add Field
                    </button>
                  </div>

                  {!qrEnabled ? (
                    <button
                      onClick={() => setQrEnabled(true)}
                      className="w-full bg-[#f5f1e6] hover:bg-[#e0c9a9] text-[#5f4b32] px-4 py-2 rounded-lg font-medium transition-colors mb-4"
                    >
                      Add QR Code
                    </button>
                  ) : (
                    <div className="border border-gray-200 rounded-lg p-4 mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-[#5f4b32]">
                          QR Code Settings
                        </h4>
                        <button
                          onClick={() => setQrEnabled(false)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">
                            X (%)
                          </label>
                          <input
                            type="number"
                            value={qrConfig.x.toFixed(2)}
                            onChange={(e) =>
                              setQrConfig((prev) => ({
                                ...prev,
                                x: parseFloat(e.target.value),
                              }))
                            }
                            className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e0c9a9] focus:border-[#d4b88f] outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">
                            Y (%)
                          </label>
                          <input
                            type="number"
                            value={qrConfig.y.toFixed(2)}
                            onChange={(e) =>
                              setQrConfig((prev) => ({
                                ...prev,
                                y: parseFloat(e.target.value),
                              }))
                            }
                            className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e0c9a9] focus:border-[#d4b88f] outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">
                            Width (px)
                          </label>
                          <input
                            type="number"
                            value={qrConfig.width}
                            onChange={(e) =>
                              setQrConfig((prev) => ({
                                ...prev,
                                width: parseInt(e.target.value),
                              }))
                            }
                            className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e0c9a9] focus:border-[#d4b88f] outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">
                            Height (px)
                          </label>
                          <input
                            type="number"
                            value={qrConfig.height}
                            onChange={(e) =>
                              setQrConfig((prev) => ({
                                ...prev,
                                height: parseInt(e.target.value),
                              }))
                            }
                            className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e0c9a9] focus:border-[#d4b88f] outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4 mt-6">
                  {variables.map((varConfig, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-[#5f4b32]">
                          {varConfig.type === "text"
                            ? varConfig.name
                            : "QR Code"}
                        </h4>
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => deleteVariable(index)}
                        >
                          Remove
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2 mb-2">
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">
                            X (%)
                          </label>
                          <input
                            type="number"
                            value={varConfig.x.toFixed(2)}
                            onChange={(e) =>
                              updateVariableProperty(
                                index,
                                "x",
                                parseFloat(e.target.value)
                              )
                            }
                            className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e0c9a9] focus:border-[#d4b88f] outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">
                            Y (%)
                          </label>
                          <input
                            type="number"
                            value={varConfig.y.toFixed(2)}
                            onChange={(e) =>
                              updateVariableProperty(
                                index,
                                "y",
                                parseFloat(e.target.value)
                              )
                            }
                            className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e0c9a9] focus:border-[#d4b88f] outline-none"
                          />
                        </div>
                      </div>

                      {varConfig.type === "text" ? (
                        <div className="space-y-2">
                          <div>
                            <label className="block text-sm text-gray-600 mb-1">
                              Font
                            </label>
                            <select
                              value={varConfig.fontFamily}
                              onChange={(e) =>
                                updateVariableProperty(
                                  index,
                                  "fontFamily",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e0c9a9] focus:border-[#d4b88f] outline-none"
                            >
                              {fontOptions.map((font) => (
                                <option key={font} value={font}>
                                  {font}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-sm text-gray-600 mb-1">
                                Size (px)
                              </label>
                              <input
                                type="number"
                                value={varConfig.fontSize}
                                onChange={(e) =>
                                  updateVariableProperty(
                                    index,
                                    "fontSize",
                                    parseInt(e.target.value)
                                  )
                                }
                                className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e0c9a9] focus:border-[#d4b88f] outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-sm text-gray-600 mb-1">
                                Color
                              </label>
                              <input
                                type="color"
                                value={varConfig.color}
                                onChange={(e) =>
                                  updateVariableProperty(
                                    index,
                                    "color",
                                    e.target.value
                                  )
                                }
                                className="w-full h-8 px-1 py-1 border border-gray-300 rounded-lg"
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">
                            Size (% of width)
                          </label>
                          <input
                            type="number"
                            value={varConfig.size}
                            onChange={(e) =>
                              updateVariableProperty(
                                index,
                                "size",
                                parseFloat(e.target.value)
                              )
                            }
                            className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e0c9a9] focus:border-[#d4b88f] outline-none"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {template && variables.filter((v) => v.type === "text").length > 0 && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-[#5f4b32] mb-4">
              Preview Certificate
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium text-[#5f4b32] mb-3">
                  Enter Sample Text
                </h3>
                <div className="space-y-3">
                  {variables
                    .filter((v) => v.type === "text")
                    .map((varConfig, index) => (
                      <div key={index} className="flex flex-col">
                        <label className="text-sm font-medium text-gray-600 mb-1">
                          {varConfig.name}
                        </label>
                        <input
                          type="text"
                          name={varConfig.name}
                          value={userInput[varConfig.name] || ""}
                          onChange={handleInputChange}
                          placeholder={`Enter ${varConfig.name}`}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e0c9a9] focus:border-[#d4b88f] outline-none"
                        />
                      </div>
                    ))}
                </div>
                <button
                  onClick={generatePreview}
                  className="mt-4 bg-[#5f4b32] hover:bg-[#4a3a27] text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Generate Preview
                </button>
              </div>

              {previewCertificate && (
                <div>
                  <h3 className="text-lg font-medium text-[#5f4b32] mb-3">
                    Certificate Preview
                  </h3>
                  <div className="border border-gray-200 rounded-lg p-2 bg-gray-50">
                    <img
                      src={previewCertificate}
                      alt="Generated Certificate"
                      className="w-full h-auto rounded"
                    />
                  </div>
                  <button
                    onClick={() =>
                      saveAs(previewCertificate, "certificate-preview.png")
                    }
                    className="mt-3 bg-[#f5f1e6] hover:bg-[#e0c9a9] text-[#5f4b32] px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Download Preview
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-[#5f4b32] mb-4">
            Upload Data File
          </h2>
          <div
            {...getExcelRootProps()}
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-[#e0c9a9] transition-colors"
          >
            <input {...getExcelInputProps()} />
            <p className="text-gray-500">
              Drag & drop Excel file with recipient data, or click to select
            </p>
            <p className="text-sm text-gray-400 mt-2">
              (Must contain an email column)
            </p>
          </div>

          {excelData.length > 0 && (
            <div className="mt-4">
              <div className="flex items-center text-green-600 mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>
                  Data file uploaded successfully with {excelData.length}{" "}
                  records
                </span>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col sm:flex-row justify-between sm:justify-end items-center gap-4 mb-8">
          <button
            onClick={generateCertificates}
            disabled={!template || !excelData.length || !variables.length}
            className={`px-6 py-3 rounded-lg font-medium ${
              !template || !excelData.length || !variables.length
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-[#5f4b32] hover:bg-[#4a3a27] text-white"
            } transition-colors w-full sm:w-auto`}
          >
            Generate Certificates
          </button>
        </div>
      </div>
    </div>
  );
};

export default CertificateGenerator;
