"use client"

import { useEffect, useRef } from "react"
import QRCode from "qrcode"

interface CertificateData {
  id: string
  certificateType: string
  recipientName: string
  achievement: string
  courseTitle: string
  issuerName: string
  issuerTitle: string
  organization: string
  issueDate: string
  expiryDate: string
  description: string
  logo: string
  signature: string
  verificationCode: string
  primaryColor: string
  secondaryColor: string
  accentColor: string
  textColor: string
  backgroundColor: string
  orientation?: string
  additionalFields: Record<string, string>
}

interface CertificatePreviewProps {
  certificateData: CertificateData
}

export function CertificatePreview({ certificateData }: CertificatePreviewProps) {
  const qrCodeRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (certificateData.verificationCode && qrCodeRef.current) {
      const verifyUrl = `https://situp.online/verify?code=${certificateData.verificationCode}`
      QRCode.toCanvas(
        qrCodeRef.current,
        verifyUrl,
        {
          width: 80,
          height: 80,
          margin: 0,
          color: {
            dark: "#000000",
            light: "#ffffff",
          },
        },
        (error) => {
          if (error) console.error(error)
        },
      )
    }
  }, [certificateData.verificationCode])

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
  }

  // Certificate of Completion
  const renderCompletionCertificate = () => {
    const isPortrait = certificateData.orientation === "portrait"

    return (
      <div
        className={`${isPortrait ? "w-[400px]" : "w-[600px]"} p-8 relative overflow-visible`}
        style={{
          backgroundColor: certificateData.backgroundColor,
          color: certificateData.textColor,
          height: "auto",
          minHeight: isPortrait ? "600px" : "400px",
        }}
      >
        {/* Border */}
        <div
          className="absolute inset-0 border-[12px] border-double rounded-lg"
          style={{ borderColor: certificateData.primaryColor }}
        ></div>

        {/* Inner content */}
        <div className="h-full flex flex-col items-center justify-between p-6">
          {/* Header */}
          <div className="text-center">
            {certificateData.logo ? (
              <img
                src={certificateData.logo || "/placeholder.svg"}
                alt="Organization Logo"
                className="h-16 mx-auto mb-2 object-contain"
                crossOrigin="anonymous"
              />
            ) : (
              <div className="h-16 w-16 mx-auto mb-2 flex items-center justify-center bg-muted/20 rounded">Logo</div>
            )}
            <h1 className="text-3xl font-bold mb-1" style={{ color: certificateData.primaryColor }}>
              {certificateData.achievement || "Certificate of Completion"}
            </h1>
            <div className="w-40 h-1 mx-auto mb-2" style={{ backgroundColor: certificateData.accentColor }}></div>
            <p className="text-sm opacity-80">{certificateData.organization || "Organization Name"}</p>
          </div>

          {/* Body */}
          <div className="text-center my-4">
            <p className="text-sm mb-4">This is to certify that</p>
            <h2 className="text-3xl font-bold mb-4 font-serif" style={{ color: certificateData.primaryColor }}>
              {certificateData.recipientName || "Recipient Name"}
            </h2>
            <p className="text-sm mb-2">has successfully completed the course</p>
            <h3 className="text-xl font-semibold mb-4">{certificateData.courseTitle || "Course Title"}</h3>
            <p className="text-sm max-w-md mx-auto">
              {certificateData.description || "With all the requirements and criteria set forth by the organization."}
            </p>
          </div>

          {/* Footer */}
          <div className="w-full flex justify-between items-end">
            <div>
              <div className="flex items-center">
                <canvas ref={qrCodeRef} width="80" height="80" className="mr-2"></canvas>
                <div className="text-xs">
                  <p>Verification Code:</p>
                  <p className="font-mono">{certificateData.verificationCode}</p>
                  <p>Issue Date: {formatDate(certificateData.issueDate)}</p>
                  {certificateData.expiryDate && <p>Valid Until: {formatDate(certificateData.expiryDate)}</p>}
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="w-40 border-b border-gray-400 mb-1 flex justify-center">
                {certificateData.signature ? (
                  <img
                    src={certificateData.signature || "/placeholder.svg"}
                    alt="Signature"
                    className="h-12 mx-auto object-contain"
                    crossOrigin="anonymous"
                  />
                ) : (
                  <div className="h-12 w-full"></div>
                )}
              </div>
              <p className="text-sm font-semibold">{certificateData.issuerName || "Issuer Name"}</p>
              <p className="text-xs">{certificateData.issuerTitle || "Issuer Title"}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Certificate of Achievement
  const renderAchievementCertificate = () => {
    const isPortrait = certificateData.orientation === "portrait"

    return (
      <div
        className={`${isPortrait ? "w-[400px]" : "w-[600px]"} p-8 relative overflow-visible`}
        style={{
          backgroundColor: certificateData.backgroundColor,
          color: certificateData.textColor,
          height: "auto",
          minHeight: isPortrait ? "600px" : "400px",
        }}
      >
        {/* Background design */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-10"
            style={{ backgroundColor: certificateData.primaryColor }}
          ></div>
          <div
            className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full opacity-10"
            style={{ backgroundColor: certificateData.accentColor }}
          ></div>
        </div>

        {/* Border */}
        <div
          className="absolute inset-4 border-2 rounded-lg"
          style={{ borderColor: certificateData.primaryColor }}
        ></div>

        {/* Inner content */}
        <div className="h-full flex flex-col items-center justify-between p-6 relative">
          {/* Header */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              {certificateData.logo ? (
                <img
                  src={certificateData.logo || "/placeholder.svg"}
                  alt="Organization Logo"
                  className="h-14 object-contain"
                  crossOrigin="anonymous"
                />
              ) : (
                <div className="h-14 w-14 flex items-center justify-center bg-muted/20 rounded">Logo</div>
              )}
            </div>
            <h1 className="text-3xl font-bold" style={{ color: certificateData.primaryColor }}>
              {certificateData.achievement || "Certificate of Achievement"}
            </h1>
            <div className="w-32 h-0.5 mx-auto my-2" style={{ backgroundColor: certificateData.accentColor }}></div>
            <p className="text-sm">Presented to</p>
          </div>

          {/* Body */}
          <div className="text-center my-4">
            <h2 className="text-4xl font-bold mb-4 font-serif" style={{ color: certificateData.primaryColor }}>
              {certificateData.recipientName || "Recipient Name"}
            </h2>
            <p className="text-sm mb-2">for outstanding achievement in</p>
            <h3 className="text-xl font-semibold mb-4">{certificateData.courseTitle || "Field of Achievement"}</h3>
            <p className="text-sm max-w-md mx-auto">
              {certificateData.description || "In recognition of exceptional performance and dedication."}
            </p>
          </div>

          {/* Footer */}
          <div className="w-full flex justify-between items-end">
            <div className="text-xs">
              <p>Date: {formatDate(certificateData.issueDate)}</p>
              <p>Certificate ID: {certificateData.verificationCode}</p>
              <canvas ref={qrCodeRef} width="60" height="60" className="mt-1"></canvas>
            </div>

            <div className="text-center">
              <div className="w-40 border-b border-gray-400 mb-1 flex justify-center">
                {certificateData.signature ? (
                  <img
                    src={certificateData.signature || "/placeholder.svg"}
                    alt="Signature"
                    className="h-12 mx-auto object-contain"
                    crossOrigin="anonymous"
                  />
                ) : (
                  <div className="h-12 w-full"></div>
                )}
              </div>
              <p className="text-sm font-semibold">{certificateData.issuerName || "Issuer Name"}</p>
              <p className="text-xs">{certificateData.issuerTitle || "Issuer Title"}</p>
              <p className="text-xs">{certificateData.organization || "Organization"}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Certificate of Appreciation
  const renderAppreciationCertificate = () => {
    const isPortrait = certificateData.orientation === "portrait"

    return (
      <div
        className={`${isPortrait ? "w-[400px]" : "w-[600px]"} p-8 relative overflow-visible`}
        style={{
          backgroundColor: certificateData.backgroundColor,
          color: certificateData.textColor,
          height: "auto",
          minHeight: isPortrait ? "600px" : "400px",
        }}
      >
        {/* Decorative elements */}
        <div
          className="absolute top-0 left-0 w-32 h-32 opacity-10"
          style={{ backgroundColor: certificateData.accentColor }}
        ></div>
        <div
          className="absolute bottom-0 right-0 w-32 h-32 opacity-10"
          style={{ backgroundColor: certificateData.accentColor }}
        ></div>

        {/* Border */}
        <div className="absolute inset-6 border rounded-lg" style={{ borderColor: certificateData.primaryColor }}></div>

        {/* Inner content */}
        <div className="h-full flex flex-col items-center justify-between p-8 relative">
          {/* Header */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-2">
              {certificateData.logo ? (
                <img
                  src={certificateData.logo || "/placeholder.svg"}
                  alt="Organization Logo"
                  className="h-12 object-contain"
                  crossOrigin="anonymous"
                />
              ) : (
                <div className="h-12 w-12 flex items-center justify-center bg-muted/20 rounded">Logo</div>
              )}
              <h1 className="text-3xl font-bold" style={{ color: certificateData.primaryColor }}>
                {certificateData.achievement || "Certificate of Appreciation"}
              </h1>
            </div>
            <div className="w-48 h-0.5 mx-auto my-2" style={{ backgroundColor: certificateData.accentColor }}></div>
          </div>

          {/* Body */}
          <div className="text-center my-4">
            <p className="text-lg mb-2">This certificate is presented to</p>
            <h2 className="text-4xl font-bold mb-4 font-serif" style={{ color: certificateData.primaryColor }}>
              {certificateData.recipientName || "Recipient Name"}
            </h2>
            <p className="text-lg mb-2">in appreciation for</p>
            <h3 className="text-xl font-semibold mb-4">{certificateData.courseTitle || "Outstanding Contribution"}</h3>
            <p className="text-sm max-w-md mx-auto">
              {certificateData.description || "For dedication, hard work, and valuable contributions."}
            </p>
          </div>

          {/* Footer */}
          <div className="w-full flex justify-between items-end">
            <div className="text-xs">
              <p>Presented on: {formatDate(certificateData.issueDate)}</p>
              <div className="flex items-center mt-2">
                <canvas ref={qrCodeRef} width="60" height="60" className="mr-2"></canvas>
                <p className="font-mono">{certificateData.verificationCode}</p>
              </div>
            </div>

            <div className="text-center">
              <div className="w-40 border-b border-gray-400 mb-1 flex justify-center">
                {certificateData.signature ? (
                  <img
                    src={certificateData.signature || "/placeholder.svg"}
                    alt="Signature"
                    className="h-12 mx-auto object-contain"
                    crossOrigin="anonymous"
                  />
                ) : (
                  <div className="h-12 w-full"></div>
                )}
              </div>
              <p className="text-sm font-semibold">{certificateData.issuerName || "Issuer Name"}</p>
              <p className="text-xs">{certificateData.issuerTitle || "Issuer Title"}</p>
              <p className="text-xs">{certificateData.organization || "Organization"}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Certificate of Participation
  const renderParticipationCertificate = () => {
    const isPortrait = certificateData.orientation === "portrait"

    return (
      <div
        className={`${isPortrait ? "w-[400px]" : "w-[600px]"} p-8 relative overflow-visible`}
        style={{
          backgroundColor: certificateData.backgroundColor,
          color: certificateData.textColor,
          height: "auto",
          minHeight: isPortrait ? "600px" : "400px",
        }}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-10 grid-rows-10 h-full w-full">
            {Array.from({ length: 100 }).map((_, i) => (
              <div key={i} className="border rounded-full" style={{ borderColor: certificateData.primaryColor }}></div>
            ))}
          </div>
        </div>

        {/* Border */}
        <div className="absolute inset-4 border rounded-lg" style={{ borderColor: certificateData.primaryColor }}></div>

        {/* Inner content */}
        <div className="h-full flex flex-col items-center justify-between p-6 relative">
          {/* Header */}
          <div className="text-center">
            {certificateData.logo ? (
              <img
                src={certificateData.logo || "/placeholder.svg"}
                alt="Organization Logo"
                className="h-14 mx-auto mb-2 object-contain"
                crossOrigin="anonymous"
              />
            ) : null}
            <h1 className="text-3xl font-bold" style={{ color: certificateData.primaryColor }}>
              {certificateData.achievement || "Certificate of Participation"}
            </h1>
            <div className="w-40 h-0.5 mx-auto my-2" style={{ backgroundColor: certificateData.accentColor }}></div>
            <p className="text-sm">This certifies that</p>
          </div>

          {/* Body */}
          <div className="text-center my-4">
            <h2 className="text-4xl font-bold mb-4 font-serif" style={{ color: certificateData.primaryColor }}>
              {certificateData.recipientName || "Recipient Name"}
            </h2>
            <p className="text-sm mb-2">has participated in</p>
            <h3 className="text-xl font-semibold mb-4">{certificateData.courseTitle || "Event or Program Name"}</h3>
            <p className="text-sm max-w-md mx-auto">
              {certificateData.description || "Held on " + formatDate(certificateData.issueDate)}
            </p>
          </div>

          {/* Footer */}
          <div className="w-full flex justify-between items-end">
            <div className="flex items-center">
              <canvas ref={qrCodeRef} width="60" height="60" className="mr-2"></canvas>
              <div className="text-xs">
                <p>Certificate ID:</p>
                <p className="font-mono">{certificateData.verificationCode}</p>
              </div>
            </div>

            <div className="text-center">
              <div className="w-40 border-b border-gray-400 mb-1 flex justify-center">
                {certificateData.signature ? (
                  <img
                    src={certificateData.signature || "/placeholder.svg"}
                    alt="Signature"
                    className="h-12 mx-auto object-contain"
                    crossOrigin="anonymous"
                  />
                ) : (
                  <div className="h-12 w-full"></div>
                )}
              </div>
              <p className="text-sm font-semibold">{certificateData.issuerName || "Issuer Name"}</p>
              <p className="text-xs">{certificateData.issuerTitle || "Issuer Title"}</p>
              <p className="text-xs">{certificateData.organization || "Organization"}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Certificate of Excellence
  const renderExcellenceCertificate = () => {
    const isPortrait = certificateData.orientation === "portrait"

    return (
      <div
        className={`${isPortrait ? "w-[400px]" : "w-[600px]"} p-8 relative overflow-visible`}
        style={{
          backgroundColor: certificateData.backgroundColor,
          color: certificateData.textColor,
          height: "auto",
          minHeight: isPortrait ? "600px" : "400px",
        }}
      >
        {/* Decorative elements */}
        <div
          className="absolute top-0 right-0 w-40 h-40 opacity-10 transform rotate-45"
          style={{ backgroundColor: certificateData.primaryColor }}
        ></div>
        <div
          className="absolute bottom-0 left-0 w-40 h-40 opacity-10 transform -rotate-45"
          style={{ backgroundColor: certificateData.accentColor }}
        ></div>

        {/* Border with double line */}
        <div
          className="absolute inset-4 border-2 rounded-lg"
          style={{ borderColor: certificateData.primaryColor }}
        ></div>
        <div className="absolute inset-6 border rounded-lg" style={{ borderColor: certificateData.accentColor }}></div>

        {/* Inner content */}
        <div className="h-full flex flex-col items-center justify-between p-8 relative">
          {/* Header */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-4">
              {certificateData.logo ? (
                <img
                  src={certificateData.logo || "/placeholder.svg"}
                  alt="Organization Logo"
                  className="h-14 object-contain"
                  crossOrigin="anonymous"
                />
              ) : null}
            </div>
            <h1 className="text-3xl font-bold mt-2" style={{ color: certificateData.primaryColor }}>
              {certificateData.achievement || "Certificate of Excellence"}
            </h1>
            <div className="w-40 h-0.5 mx-auto my-2" style={{ backgroundColor: certificateData.accentColor }}></div>
          </div>

          {/* Body */}
          <div className="text-center my-4">
            <p className="text-lg mb-2">This certificate is awarded to</p>
            <h2 className="text-4xl font-bold mb-4 font-serif" style={{ color: certificateData.primaryColor }}>
              {certificateData.recipientName || "Recipient Name"}
            </h2>
            <p className="text-lg mb-2">for demonstrating excellence in</p>
            <h3 className="text-xl font-semibold mb-4">{certificateData.courseTitle || "Field or Subject"}</h3>
            <p className="text-sm max-w-md mx-auto">
              {certificateData.description || "In recognition of outstanding performance and exceptional achievement."}
            </p>
          </div>

          {/* Footer */}
          <div className="w-full flex justify-between items-end">
            <div className="text-xs">
              <p>Date of Award: {formatDate(certificateData.issueDate)}</p>
              <div className="flex items-center mt-2">
                <canvas ref={qrCodeRef} width="60" height="60" className="mr-2"></canvas>
                <p className="font-mono">{certificateData.verificationCode}</p>
              </div>
            </div>

            <div className="text-center">
              <div className="w-40 border-b border-gray-400 mb-1 flex justify-center">
                {certificateData.signature ? (
                  <img
                    src={certificateData.signature || "/placeholder.svg"}
                    alt="Signature"
                    className="h-12 mx-auto object-contain"
                    crossOrigin="anonymous"
                  />
                ) : (
                  <div className="h-12 w-full"></div>
                )}
              </div>
              <p className="text-sm font-semibold">{certificateData.issuerName || "Issuer Name"}</p>
              <p className="text-xs">{certificateData.issuerTitle || "Issuer Title"}</p>
              <p className="text-xs">{certificateData.organization || "Organization"}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Certificate of Graduation
  const renderGraduationCertificate = () => {
    const isPortrait = certificateData.orientation === "portrait"

    return (
      <div
        className={`${isPortrait ? "w-[400px]" : "w-[600px]"} p-8 relative overflow-visible`}
        style={{
          backgroundColor: certificateData.backgroundColor,
          color: certificateData.textColor,
          height: "auto",
          minHeight: isPortrait ? "600px" : "400px",
        }}
      >
        {/* Background design */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <div
            className="w-96 h-96 rounded-full"
            style={{ border: `30px solid ${certificateData.primaryColor}` }}
          ></div>
        </div>

        {/* Border */}
        <div
          className="absolute inset-3 border-4 rounded-lg"
          style={{ borderColor: certificateData.primaryColor }}
        ></div>

        {/* Inner content */}
        <div className="h-full flex flex-col items-center justify-between p-6 relative">
          {/* Header */}
          <div className="text-center">
            {certificateData.logo ? (
              <img
                src={certificateData.logo || "/placeholder.svg"}
                alt="Organization Logo"
                className="h-16 mx-auto mb-2 object-contain"
                crossOrigin="anonymous"
              />
            ) : null}
            <h1 className="text-3xl font-bold" style={{ color: certificateData.primaryColor }}>
              {certificateData.achievement || "Certificate of Graduation"}
            </h1>
            <div className="w-40 h-1 mx-auto my-2" style={{ backgroundColor: certificateData.accentColor }}></div>
            <p className="text-sm">{certificateData.organization || "Institution Name"}</p>
          </div>

          {/* Body */}
          <div className="text-center my-4">
            <p className="text-lg mb-2">This is to certify that</p>
            <h2 className="text-4xl font-bold mb-4 font-serif" style={{ color: certificateData.primaryColor }}>
              {certificateData.recipientName || "Graduate Name"}
            </h2>
            <p className="text-lg mb-2">has successfully graduated from</p>
            <h3 className="text-xl font-semibold mb-4">{certificateData.courseTitle || "Program or Course"}</h3>
            <p className="text-sm max-w-md mx-auto">
              {certificateData.description || "Having fulfilled all requirements and demonstrated academic excellence."}
            </p>
          </div>

          {/* Footer */}
          <div className="w-full flex justify-between items-end">
            <div className="text-xs">
              <p>Graduation Date: {formatDate(certificateData.issueDate)}</p>
              <div className="flex items-center mt-2">
                <canvas ref={qrCodeRef} width="60" height="60" className="mr-2"></canvas>
                <p className="font-mono">{certificateData.verificationCode}</p>
              </div>
            </div>

            <div className="text-center">
              <div className="w-40 border-b border-gray-400 mb-1 flex justify-center">
                {certificateData.signature ? (
                  <img
                    src={certificateData.signature || "/placeholder.svg"}
                    alt="Signature"
                    className="h-12 mx-auto object-contain"
                    crossOrigin="anonymous"
                  />
                ) : (
                  <div className="h-12 w-full"></div>
                )}
              </div>
              <p className="text-sm font-semibold">{certificateData.issuerName || "Issuer Name"}</p>
              <p className="text-xs">{certificateData.issuerTitle || "Issuer Title"}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Render the appropriate certificate based on type
  const renderCertificate = () => {
    switch (certificateData.certificateType) {
      case "achievement":
        return renderAchievementCertificate()
      case "appreciation":
        return renderAppreciationCertificate()
      case "participation":
        return renderParticipationCertificate()
      case "excellence":
        return renderExcellenceCertificate()
      case "graduation":
        return renderGraduationCertificate()
      case "completion":
      default:
        return renderCompletionCertificate()
    }
  }

  return <div className="flex justify-center items-center w-full">{renderCertificate()}</div>
}

