"use client"

import { useEffect, useRef } from "react"
import QRCode from "qrcode"

interface IDCardData {
  id: string
  cardType: string
  name: string
  designation: string
  organization: string
  department: string
  employeeId: string
  email: string
  phone: string
  validFrom: string
  validUntil: string
  address: string
  photo: string
  signature: string
  logo: string
  qrValue: string
  primaryColor: string
  secondaryColor: string
  textColor: string
  backgroundColor: string
  layout?: string
  additionalFields: Record<string, string>
}

interface IDCardPreviewProps {
  cardData: IDCardData
}

export function IDCardPreview({ cardData }: IDCardPreviewProps) {
  const qrCodeRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (cardData.qrValue && qrCodeRef.current) {
      const verifyUrl = `https://situp.online/verify?code=${cardData.employeeId}`

      QRCode.toCanvas(
        qrCodeRef.current,
        verifyUrl || "https://situp.online/verify",
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
  }, [cardData.qrValue, cardData.employeeId])

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  }

  // Employee ID Card
  const renderEmployeeCard = () => {
    const isVertical = cardData.layout === "vertical"

    return (
      <div
        className={`${isVertical ? "w-[240px]" : "w-[340px]"} rounded-lg overflow-visible flex flex-col`}
        style={{
          backgroundColor: cardData.backgroundColor,
          color: cardData.textColor,
          height: "auto",
          minHeight: isVertical ? "380px" : "210px",
        }}
      >
        <div className="h-16" style={{ backgroundColor: cardData.primaryColor }}></div>

        <div className="px-4 pt-4 pb-4 relative flex-1">
          <div
            className="absolute -top-12 left-4 w-20 h-20 rounded-full overflow-hidden border-4 flex items-center justify-center"
            style={{ borderColor: cardData.secondaryColor, backgroundColor: "#f0f0f0" }}
          >
            {cardData.photo ? (
              <img
                src={cardData.photo || "/placeholder.svg"}
                alt="Employee"
                className="w-full h-full object-cover"
                crossOrigin="anonymous"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">Photo</div>
            )}
          </div>

          <div className="ml-24">
            <h3 className="font-bold text-lg leading-tight">{cardData.name || "Employee Name"}</h3>
            <p className="text-sm opacity-90">{cardData.designation || "Designation"}</p>
            <p className="text-xs opacity-80">{cardData.department || "Department"}</p>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="col-span-2 space-y-1">
              <div className="flex items-center">
                <span className="text-xs font-semibold w-16">ID:</span>
                <span className="text-xs">{cardData.employeeId || "EMP-12345"}</span>
              </div>
              <div className="flex items-center">
                <span className="text-xs font-semibold w-16">Phone:</span>
                <span className="text-xs">{cardData.phone || "+1 (555) 123-4567"}</span>
              </div>
              <div className="flex items-center">
                <span className="text-xs font-semibold w-16">Email:</span>
                <span className="text-xs truncate max-w-[140px]">{cardData.email || "email@example.com"}</span>
              </div>
              <div className="flex items-center">
                <span className="text-xs font-semibold w-16">Valid:</span>
                <span className="text-xs">
                  {formatDate(cardData.validFrom)} - {formatDate(cardData.validUntil)}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center">
              <canvas ref={qrCodeRef} width="80" height="80" className="mb-1"></canvas>
              <span className="text-[8px] text-center">Scan to verify</span>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            {cardData.logo ? (
              <img
                src={cardData.logo || "/placeholder.svg"}
                alt="Organization Logo"
                className="h-12 object-contain"
                crossOrigin="anonymous"
              />
            ) : (
              <div className="text-xs opacity-70">{cardData.organization || "Organization Name"}</div>
            )}

            {cardData.signature ? (
              <div className="flex flex-col items-center">
                <img
                  src={cardData.signature || "/placeholder.svg"}
                  alt="Signature"
                  className="h-8 object-contain"
                  crossOrigin="anonymous"
                />
                <span className="text-[8px]">Authorized Signature</span>
              </div>
            ) : (
              <div className="w-20 border-b border-gray-400 text-center">
                <span className="text-[8px]">Authorized Signature</span>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Student ID Card
  const renderStudentCard = () => {
    const isVertical = cardData.layout === "vertical"

    return (
      <div
        className={`${isVertical ? "w-[240px]" : "w-[340px]"} rounded-lg overflow-visible flex flex-col`}
        style={{
          backgroundColor: cardData.backgroundColor,
          color: cardData.textColor,
          height: "auto",
          minHeight: isVertical ? "380px" : "210px",
        }}
      >
        <div
          className="flex h-12 items-center px-4"
          style={{ backgroundColor: cardData.primaryColor, color: cardData.secondaryColor }}
        >
          {cardData.logo ? (
            <img
              src={cardData.logo || "/placeholder.svg"}
              alt="School Logo"
              className="h-8 mr-2 object-contain"
              crossOrigin="anonymous"
            />
          ) : (
            <div className="h-8 w-8 mr-2 flex items-center justify-center bg-muted/20 rounded">Logo</div>
          )}
          <div>
            <h3 className="font-bold text-sm">{cardData.organization || "School Name"}</h3>
            <p className="text-xs opacity-90">Student Identification Card</p>
          </div>
        </div>

        <div className="p-4 flex flex-1">
          <div
            className="w-24 h-32 rounded overflow-hidden mr-4 border flex items-center justify-center"
            style={{ borderColor: cardData.primaryColor, backgroundColor: "#f0f0f0" }}
          >
            {cardData.photo ? (
              <img
                src={cardData.photo || "/placeholder.svg"}
                alt="Student"
                className="w-full h-full object-cover"
                crossOrigin="anonymous"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">Photo</div>
            )}
          </div>

          <div className="flex-1">
            <h3 className="font-bold text-lg">{cardData.name || "Student Name"}</h3>
            <p className="text-sm opacity-90">{cardData.department || "Department/Class"}</p>

            <div className="mt-2 space-y-1">
              <div className="flex items-center">
                <span className="text-xs font-semibold w-16">Student ID:</span>
                <span className="text-xs">{cardData.employeeId || "STU-12345"}</span>
              </div>
              <div className="flex items-center">
                <span className="text-xs font-semibold w-16">Valid Until:</span>
                <span className="text-xs">{formatDate(cardData.validUntil) || "Dec 31, 2025"}</span>
              </div>
              <div className="flex items-center">
                <span className="text-xs font-semibold w-16">Contact:</span>
                <span className="text-xs">{cardData.phone || "+1 (555) 123-4567"}</span>
              </div>
            </div>

            <div className="mt-4 flex items-end justify-between">
              <canvas ref={qrCodeRef} width="60" height="60"></canvas>

              {cardData.signature ? (
                <div className="flex flex-col items-center">
                  <img
                    src={cardData.signature || "/placeholder.svg"}
                    alt="Signature"
                    className="h-8 object-contain"
                    crossOrigin="anonymous"
                  />
                  <span className="text-[8px]">Student Signature</span>
                </div>
              ) : (
                <div className="w-20 border-b border-gray-400 text-center">
                  <span className="text-[8px]">Student Signature</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Visitor Pass
  const renderVisitorCard = () => {
    const isVertical = cardData.layout === "vertical"

    return (
      <div
        className={`${isVertical ? "w-[240px]" : "w-[340px]"} rounded-lg overflow-visible flex flex-col`}
        style={{
          backgroundColor: cardData.backgroundColor,
          color: cardData.textColor,
          height: "auto",
          minHeight: isVertical ? "380px" : "210px",
        }}
      >
        <div
          className="h-16 flex items-center justify-center"
          style={{ backgroundColor: cardData.primaryColor, color: cardData.secondaryColor }}
        >
          <h2 className="text-xl font-bold">VISITOR</h2>
        </div>

        <div className="p-4 flex flex-col items-center flex-1">
          <div
            className="w-20 h-20 rounded-full overflow-hidden mb-2 border-2 flex items-center justify-center"
            style={{ borderColor: cardData.primaryColor, backgroundColor: "#f0f0f0" }}
          >
            {cardData.photo ? (
              <img
                src={cardData.photo || "/placeholder.svg"}
                alt="Visitor"
                className="w-full h-full object-cover"
                crossOrigin="anonymous"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">Photo</div>
            )}
          </div>

          <h3 className="font-bold text-lg text-center">{cardData.name || "Visitor Name"}</h3>
          <p className="text-sm opacity-90 text-center">{cardData.organization || "From: Company Name"}</p>

          <div className="mt-2 w-full grid grid-cols-2 gap-2">
            <div className="text-center">
              <p className="text-xs font-semibold">Visit Date</p>
              <p className="text-xs">{formatDate(cardData.validFrom) || "Today's Date"}</p>
            </div>
            <div className="text-center">
              <p className="text-xs font-semibold">Visitor ID</p>
              <p className="text-xs">{cardData.employeeId || "VIS-12345"}</p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between w-full">
            <canvas ref={qrCodeRef} width="60" height="60"></canvas>

            <div className="text-right">
              <p className="text-xs font-semibold">Authorized by</p>
              {cardData.signature ? (
                <img
                  src={cardData.signature || "/placeholder.svg"}
                  alt="Signature"
                  className="h-8 object-contain"
                  crossOrigin="anonymous"
                />
              ) : (
                <div className="w-20 border-b border-gray-400"></div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Event Badge
  const renderEventCard = () => {
    const isVertical = cardData.layout === "vertical"

    return (
      <div
        className={`${isVertical ? "w-[240px]" : "w-[340px]"} rounded-lg overflow-visible flex flex-col`}
        style={{
          backgroundColor: cardData.backgroundColor,
          color: cardData.textColor,
          height: "auto",
          minHeight: isVertical ? "380px" : "210px",
        }}
      >
        <div
          className="h-20 flex items-center justify-center p-4"
          style={{ backgroundColor: cardData.primaryColor, color: cardData.secondaryColor }}
        >
          {cardData.logo ? (
            <img
              src={cardData.logo || "/placeholder.svg"}
              alt="Event Logo"
              className="h-12 mr-3 object-contain"
              crossOrigin="anonymous"
            />
          ) : null}
          <div className="text-center">
            <h2 className="text-xl font-bold">{cardData.organization || "EVENT NAME"}</h2>
            <p className="text-sm opacity-90">Conference Badge</p>
          </div>
        </div>

        <div className="p-4 flex flex-col items-center justify-between flex-1">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-1">{cardData.name || "Attendee Name"}</h3>
            <p className="text-md">{cardData.designation || "Role / Position"}</p>
            <p className="text-sm opacity-80">{cardData.department || "Company / Organization"}</p>
          </div>

          <div className="w-full flex justify-between items-end">
            <div>
              <p className="text-xs font-semibold">Badge ID: {cardData.employeeId || "EVT-12345"}</p>
              <p className="text-xs">
                {formatDate(cardData.validFrom)} - {formatDate(cardData.validUntil)}
              </p>
            </div>

            <div>
              <canvas ref={qrCodeRef} width="60" height="60"></canvas>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Security Badge
  const renderSecurityCard = () => {
    const isVertical = cardData.layout === "vertical"

    return (
      <div
        className={`${isVertical ? "w-[240px]" : "w-[340px]"} rounded-lg overflow-visible flex flex-col`}
        style={{
          backgroundColor: cardData.backgroundColor,
          color: cardData.textColor,
          height: "auto",
          minHeight: isVertical ? "380px" : "210px",
        }}
      >
        <div
          className="h-12 flex items-center justify-between px-4"
          style={{ backgroundColor: cardData.primaryColor, color: cardData.secondaryColor }}
        >
          <h2 className="text-lg font-bold">SECURITY</h2>
          {cardData.logo ? (
            <img
              src={cardData.logo || "/placeholder.svg"}
              alt="Security Logo"
              className="h-8 object-contain"
              crossOrigin="anonymous"
            />
          ) : null}
        </div>

        <div className="p-4 flex flex-1">
          <div
            className="w-24 h-32 rounded overflow-hidden mr-4 border-2 flex items-center justify-center"
            style={{ borderColor: cardData.primaryColor, backgroundColor: "#f0f0f0" }}
          >
            {cardData.photo ? (
              <img
                src={cardData.photo || "/placeholder.svg"}
                alt="Security Personnel"
                className="w-full h-full object-cover"
                crossOrigin="anonymous"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">Photo</div>
            )}
          </div>

          <div className="flex-1">
            <div
              className="inline-block px-2 py-0.5 mb-2 text-xs font-bold rounded"
              style={{ backgroundColor: cardData.primaryColor, color: cardData.secondaryColor }}
            >
              CLEARANCE LEVEL: A
            </div>
            <h3 className="font-bold text-lg">{cardData.name || "Security Personnel"}</h3>
            <p className="text-sm opacity-90">{cardData.designation || "Security Officer"}</p>

            <div className="mt-2 space-y-1">
              <div className="flex items-center">
                <span className="text-xs font-semibold w-16">ID Number:</span>
                <span className="text-xs">{cardData.employeeId || "SEC-12345"}</span>
              </div>
              <div className="flex items-center">
                <span className="text-xs font-semibold w-16">Valid Until:</span>
                <span className="text-xs">{formatDate(cardData.validUntil) || "Dec 31, 2025"}</span>
              </div>
              <div className="flex items-center">
                <span className="text-xs font-semibold w-16">Department:</span>
                <span className="text-xs">{cardData.department || "Security Division"}</span>
              </div>
            </div>

            <div className="mt-4 flex items-end justify-between">
              <canvas ref={qrCodeRef} width="60" height="60"></canvas>

              {cardData.signature ? (
                <div className="flex flex-col items-center">
                  <img
                    src={cardData.signature || "/placeholder.svg"}
                    alt="Signature"
                    className="h-8 object-contain"
                    crossOrigin="anonymous"
                  />
                  <span className="text-[8px]">Authorized Signature</span>
                </div>
              ) : (
                <div className="w-20 border-b border-gray-400 text-center">
                  <span className="text-[8px]">Authorized Signature</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Corporate ID Card
  const renderCorporateCard = () => {
    const isVertical = cardData.layout === "vertical"

    return (
      <div
        className={`${isVertical ? "w-[240px]" : "w-[340px]"} rounded-lg overflow-visible flex flex-col`}
        style={{
          backgroundColor: cardData.backgroundColor,
          color: cardData.textColor,
          height: "auto",
          minHeight: isVertical ? "380px" : "210px",
        }}
      >
        <div
          className="flex p-4 items-center justify-between"
          style={{ backgroundColor: cardData.primaryColor, color: cardData.secondaryColor }}
        >
          {cardData.logo ? (
            <img
              src={cardData.logo || "/placeholder.svg"}
              alt="Corporate Logo"
              className="h-10 object-contain"
              crossOrigin="anonymous"
            />
          ) : (
            <div className="text-lg font-bold">{cardData.organization || "CORPORATION"}</div>
          )}
          <div className="text-right">
            <div className="text-xs opacity-80">Corporate ID</div>
            <div className="text-sm font-bold">{cardData.employeeId || "CORP-12345"}</div>
          </div>
        </div>

        <div className="p-4 flex flex-1">
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-lg">{cardData.name || "Employee Name"}</h3>
              <p className="text-sm">{cardData.designation || "Position"}</p>
              <p className="text-xs opacity-80">{cardData.department || "Department"}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center">
                <span className="text-xs font-semibold w-16">Email:</span>
                <span className="text-xs truncate max-w-[140px]">{cardData.email || "email@example.com"}</span>
              </div>
              <div className="flex items-center">
                <span className="text-xs font-semibold w-16">Phone:</span>
                <span className="text-xs">{cardData.phone || "+1 (555) 123-4567"}</span>
              </div>
              <div className="flex items-center">
                <span className="text-xs font-semibold w-16">Valid:</span>
                <span className="text-xs">
                  {formatDate(cardData.validFrom)} - {formatDate(cardData.validUntil)}
                </span>
              </div>
            </div>
          </div>

          <div className="ml-4 flex flex-col items-center">
            <div
              className="w-24 h-24 rounded-full overflow-hidden mb-2 border-2 flex items-center justify-center"
              style={{ borderColor: cardData.primaryColor, backgroundColor: "#f0f0f0" }}
            >
              {cardData.photo ? (
                <img
                  src={cardData.photo || "/placeholder.svg"}
                  alt="Employee"
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">
                  Photo
                </div>
              )}
            </div>
            <canvas ref={qrCodeRef} width="60" height="60"></canvas>
          </div>
        </div>
      </div>
    )
  }

  // Render the appropriate card based on type
  const renderCard = () => {
    switch (cardData.cardType) {
      case "student":
        return renderStudentCard()
      case "visitor":
        return renderVisitorCard()
      case "event":
        return renderEventCard()
      case "security":
        return renderSecurityCard()
      case "corporate":
        return renderCorporateCard()
      case "employee":
      default:
        return renderEmployeeCard()
    }
  }

  return <div className="flex justify-center items-center w-full">{renderCard()}</div>
}

