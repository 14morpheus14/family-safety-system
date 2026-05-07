import { DetectionEngine } from "../../src/engine/detectionEngine";

describe("Large Deterministic Threat Corpus", () => {
  const engine = new DetectionEngine();

  const missedSamples: string[] = [];
  const maliciousCorpus: string[] = [
    "URGENT verify your account immediately",
    "Click http://bit.ly/reset-password now",
    "Your OTP is required to avoid suspension",
    "Download update.exe immediately",
    "Install secure-update.apk to continue",
    "You won free crypto giveaway",
    "Verify KYC or account blocked",
    "Send bank password immediately",
    "BTC investment guaranteed returns",
    "Claim prize now urgent",
    "Call support immediately for refund",
    "Your account suspended click here",
    "Verify PAN and OTP immediately",
    "Install.apk to receive reward",
    "http://192.168.1.10/login",
    "http://xn--paypal-security.com",
    "FREE FREE FREE WINNER!!!",
    "Transfer crypto urgently",
    "Password reset required immediately",
    "Click tinyurl.com/free-gift",
    "Provide CVV and OTP now",
    "Your bank account frozen",
    "URGENT action required now",
    "Send verification code now",
    "Prize money waiting claim now",
    "Install remote support APK",
    "Enable accessibility permissions",
    "Share screen for KYC verification",
    "Download secure banking app.apk",
    "Click to avoid deactivation",
    "Verify Aadhaar immediately to avoid suspension",
"Your SBI account has been blocked",
"Reset password using attached link",
"Click http://goo.gl/free-money",
"Install latest banking security APK",
"Enable remote access for refund",
"Send OTP to continue verification",
"Urgent tax refund pending",
"Your KYC expired update now",
"Free iPhone winner selected",
"Claim lottery reward immediately",
"Download invoice.js now",
"Payment failed verify account",
"Crypto investment guaranteed 10x",
"Limited time free BTC airdrop",
"Your debit card suspended",
"Update PAN card urgently",
"Call support to avoid account freeze",
"Install AnyDesk for support",
"Install TeamViewer QuickSupport",
"Verify identity within 24 hours",
"Win cash reward instantly",
"Click now for free recharge",
"Your WhatsApp account will expire",
"Verify UPI immediately",
"Reset netbanking password now",
"Account locked due to suspicious activity",
"Immediate verification required",
"Your parcel is held click here",
"Customs fee pending payment",
"Provide CVV for refund",
"Install app from unknown source",
"APK security update required",
"Download reward coupon.scr",
"Open attachment payment.exe",
"Click to claim insurance refund",
"Bank alert verify mobile number",
"Government subsidy pending",
"Income tax refund available",
"Update mobile banking credentials",
"Provide OTP for cancellation",
"Reward expires tonight",
"Act now limited opportunity",
"Congratulations selected winner",
"Secure your wallet immediately",
"Free NFT mint available",
"Wallet synchronization required",
"Import crypto wallet phrase",
"Your wallet compromised",
"Recovery phrase verification required",
"Verify biometric KYC now",
"Click to unblock account",
"Security alert account breach",
"Reset transaction PIN now",
"Emergency banking verification",
"Complete verification to avoid ban",
"PhonePe verification pending",
"Google Pay blocked verify",
"Paytm wallet suspended",
"Urgent RBI compliance update",
"Install RBI secure app.apk",
"W1N FR33 PR1ZE NOW",
"Cl1ck hxxp://b1t.ly/free",
"0TP requ1red immediately",
"Bank acc0unt suspended",
"Fr33 recharge available",
"Verify now to avoid arrest",
"Police complaint pending payment",
"Your SIM will deactivate",
"Re-KYC required immediately",
"Mandatory telecom verification",
"Click link to avoid service block",
"Netflix payment failed verify",
"Amazon account suspended",
"Flipkart refund pending",
"Download secure patch.bat",
"Execute update.vbs immediately",
"Provide remote desktop access",
"Share screen for support",
"Install accessibility helper",
"Click to enable permissions",
"Your EMI overdue pay now",
"Final warning verify immediately",
"Account termination notice",
"Confirm identity to continue",
"Gift card reward waiting",
"Click now for cashback",
"Your child scholarship approved",
"Claim educational subsidy",
"Urgent family verification required",
"COVID relief fund pending",
"Medical insurance activation required",
"Verify passport immediately",
"Immigration issue resolve now",
"Install mandatory security patch",
"Update browser extension now",
"Chrome security update required",
"Device infected click immediately",
"Virus detected install cleaner",
"Download anti-virus setup.exe",
"Urgent crypto liquidation alert",
"Wallet breach detected",
"Send seed phrase for recovery",
"Activate secure banking shield",
"Card disabled verify identity"
  ];

  const benignCorpus: string[] = [
    "Family dinner tonight",
    "Meeting moved to tomorrow",
    "Please submit assignment",
    "Happy birthday have a great year",
    "Lets watch a movie tonight",
    "Project discussion at office",
    "Dinner at 8 PM",
    "Travel itinerary attached",
    "Invoice for groceries",
    "Weather is pleasant today",
    "Bank statement generated successfully",
    "OTP for login is 123456",
    "Crypto research paper published",
    "Winter vacation starts tomorrow",
    "Call me when free",
    "Electricity bill paid successfully",
    "Your package shipped today",
    "Team meeting completed",
    "Exam results announced",
    "Lunch at restaurant tomorrow",
    "Please review document",
    "Your salary credited",
    "Class starts at 10 AM",
    "Train arrives at 6 PM",
    "Happy anniversary",
    "Presentation uploaded successfully",
    "Photos from trip attached",
    "Gym membership renewed",
    "Medicine reminder for evening",
    "Conference registration completed",
    "Your OTP for login is 482991",
"Bank statement ready for download",
"Crypto conference starts tomorrow",
"BTC market analysis attached",
"Discuss blockchain research paper",
"Please verify meeting attendance",
"Account successfully created",
"Password updated successfully",
"Your refund has been processed",
"Please click save document",
"Download lecture notes pdf",
"Family vacation photos uploaded",
"Gym trainer appointment confirmed",
"Classroom access enabled",
"Electricity payment completed",
"Monthly salary credited",
"Tax filing appointment tomorrow",
"Movie tickets booked successfully",
"Amazon package delivered",
"Netflix subscription renewed",
"Your exam hall ticket available",
"Railway ticket confirmed",
"Doctor appointment scheduled",
"Office VPN credentials updated",
"Research grant approved",
"University portal maintenance tonight",
"Library membership renewed",
"Call me after class",
"Attached meeting agenda",
"Presentation for seminar ready",
"Review attached thesis draft",
"Invoice generated successfully",
"Dinner reservation confirmed",
"Photos synced to cloud",
"Project repository updated",
"Docker container deployed",
"Node server restarted",
"API integration completed",
"Please update README",
"Banking seminar next week",
"Cybersecurity workshop registration completed",
"Cryptography lecture postponed",
"Research collaboration discussion tomorrow",
"OTP-based authentication implemented",
"Password hashing module completed",
"JWT verification integrated",
"Package installation successful",
"Your order has shipped",
"Package out for delivery",
"Happy wedding anniversary",
"Good morning have a nice day",
"Take medicines after dinner",
"Reminder for yoga session",
"Electric bill generated",
"Conference room booked",
"Train delayed by 10 minutes",
"Airport pickup confirmed",
"Please submit lab report",
"Assignment deadline extended",
"Results published on portal",
"Team lunch tomorrow",
"Coffee meeting at 5 PM",
"Attached architecture diagram",
"Discuss Prisma migration tomorrow",
"Backend deployment completed",
"Frontend testing successful",
"Family group video call tonight",
"Car service appointment booked",
"Pet vaccination reminder",
"Your internet bill is generated",
"Maintenance scheduled tonight",
"Office closed tomorrow",
"Happy birthday professor",
"Workshop certificate generated",
"Research paper accepted",
"Manuscript revisions completed",
"Please check attached spreadsheet",
"Code review completed",
"System update installed successfully",
"University fee payment received",
"Hotel reservation confirmed",
"Flight boarding starts at 8 PM",
"Security seminar registration completed",
"UPI payment received successfully",
"Aadhaar update completed successfully",
"Passport renewal appointment booked",
"Insurance premium paid",
"Your reimbursement is approved",
"Medical report available",
"Your support ticket was resolved",
"Please restart your laptop",
"Seminar postponed to Friday",
"Weekly sprint completed",
"Thank you for your help",
"Meeting recording uploaded",
"See you tomorrow",
"Take care and drive safely",
"Your attendance has been marked",
"Research dataset uploaded",
"Presentation slides finalized",
"Conference paper camera-ready submitted"
  ];

  test("should detect malicious corpus with high recall", () => {
    let detected = 0;

    for (const sample of maliciousCorpus) {
  const result =
    engine.analyze(sample);

  if (result.isSuspicious) {
    detected += 1;
  } else {
  missedSamples.push(sample);

  console.log(
    "[MISSED MALICIOUS]",
    sample,
    result
  );
}
}

console.log(
    "MISSED SAMPLES:",
    missedSamples
  );

    const recall =
      detected / maliciousCorpus.length;

      console.log(
        "Recall:",
            recall,
        "Detected:",
            detected,
        "Total:",
            maliciousCorpus.length
        );

    expect(recall).toBeGreaterThanOrEqual(0.90);
  });

  test("should avoid false positives on benign corpus", () => {
    let falsePositives = 0;

    for (const sample of benignCorpus) {
      const result = engine.analyze(sample);

      if (result.isSuspicious) {
        falsePositives += 1;
      }
    }

    const falsePositiveRate =
      falsePositives / benignCorpus.length;

    expect(falsePositiveRate)
      .toBeLessThanOrEqual(0.20);
  });

  test("should maintain deterministic scoring", () => {
    const sample =
      "URGENT verify account http://bit.ly/reset.exe";

    const first =
      engine.analyze(sample);

    const second =
      engine.analyze(sample);

    expect(first.riskScore)
      .toBe(second.riskScore);

    expect(first.severity)
      .toBe(second.severity);

    expect(first.categories)
      .toEqual(second.categories);
  });

  test("should maintain acceptable precision on mixed corpus", () => {
  const mixedCorpus = [
    ...maliciousCorpus,
    ...benignCorpus
  ];

  let truePositives = 0;
  let falsePositives = 0;


  for (const sample of maliciousCorpus) {
    const result = engine.analyze(sample);

    if (result.isSuspicious) {
      truePositives += 1;
    }
  }

  for (const sample of benignCorpus) {
    const result = engine.analyze(sample);

    if (result.isSuspicious) {
      falsePositives += 1;
    }
  }

  const precision =
    truePositives /
    (truePositives + falsePositives);

  expect(precision)
    .toBeGreaterThanOrEqual(0.80);
});

  test("should resist obfuscated attacks", () => {
    const adversarialCorpus = [
      "W1N fr33 pr1z3 now",
      "V3r1fy acc0unt immediately",
      "Cl1ck b1t.ly/reset",
      "Fr33 crypt0 giveaway",
      "Inst4ll APK n0w"
    ];

    for (const sample of adversarialCorpus) {
      const result =
        engine.analyze(sample);

      if (!result.isSuspicious) {
  console.log(
    "[MISSED OBFUSCATED]",
    sample,
    result
  );
}

expect(result.isSuspicious)
  .toBe(true);
    }
  });
});