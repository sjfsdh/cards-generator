"use server"

import fs from "fs"
import path from "path"
import { promisify } from "util"
import { generateUniqueId } from "@/lib/utils"

// Promisify fs functions
const mkdir = promisify(fs.mkdir)
const writeFile = promisify(fs.writeFile)
const unlink = promisify(fs.unlink)
const readdir = promisify(fs.readdir)
const stat = promisify(fs.stat)

// Base directory for temporary files
const TEMP_DIR = path.join(process.cwd(), "temp")

// Ensure temp directory exists
export async function ensureTempDir() {
  try {
    if (!fs.existsSync(TEMP_DIR)) {
      await mkdir(TEMP_DIR, { recursive: true })
    }
    return true
  } catch (error) {
    console.error("Error creating temp directory:", error)
    return false
  }
}

// Save a file to the temp directory
export async function saveTemporaryFile(fileData: string, fileType = "png"): Promise<string | null> {
  try {
    await ensureTempDir()

    // Generate a unique filename
    const filename = `${generateUniqueId()}.${fileType}`
    const filePath = path.join(TEMP_DIR, filename)

    // For base64 data URLs, extract the actual base64 data
    let data = fileData
    if (fileData.startsWith("data:")) {
      data = fileData.split(",")[1]
    }

    // Write the file
    await writeFile(filePath, Buffer.from(data, "base64"))

    // Schedule cleanup
    scheduleCleanup(filePath)

    return filename
  } catch (error) {
    console.error("Error saving temporary file:", error)
    return null
  }
}

// Delete a file after a specified timeout
function scheduleCleanup(filePath: string, timeoutMs = 600000) {
  setTimeout(async () => {
    try {
      if (fs.existsSync(filePath)) {
        await unlink(filePath)
        console.log(`Cleaned up temporary file: ${filePath}`)
      }
    } catch (error) {
      console.error(`Error cleaning up file ${filePath}:`, error)
    }
  }, timeoutMs)
}

// Clean up old temporary files
export async function cleanupOldFiles(maxAgeMs = 600000) {
  try {
    await ensureTempDir()

    const files = await readdir(TEMP_DIR)
    const now = Date.now()

    for (const file of files) {
      const filePath = path.join(TEMP_DIR, file)
      const fileStat = await stat(filePath)

      // If file is older than maxAgeMs, delete it
      if (now - fileStat.mtimeMs > maxAgeMs) {
        await unlink(filePath)
        console.log(`Cleaned up old file: ${file}`)
      }
    }

    return true
  } catch (error) {
    console.error("Error cleaning up old files:", error)
    return false
  }
}

