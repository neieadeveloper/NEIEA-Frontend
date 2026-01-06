import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Heart,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Donate = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [donationType, setDonationType] = useState<"once" | "monthly" | "quarterly" | "annually">("once");
  const [customAmount, setCustomAmount] = useState("");
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [expandedTier, setExpandedTier] = useState<string | null>(null);
  const navigate = useNavigate();

  const quickAmounts = [500, 1000, 2500, 5000, 10000];

  const donationTiers = {
    monthly: [
      {
        name: "Bronze Donor (Monthly)",
        amount: 500,
        benefits: [
          "Receives student details (name, location, monthly progress)",
          "Quarterly virtual connect via NEIEA intermediary",
          "Access to NEIEA website and annual audited tax returns",
          "Chat with NEIEA staff (2 hrs/day, Mon-Sat)",
        ],
      },
      {
        name: "Silver Donor (Monthly)",
        amount: 10000,
        benefits: [
          "Linked to sponsored Coordinator",
          "Access to NEIEA website and annual audited tax returns",
          "Chat with NEIEA staff",
          "Invited to Donor Forum (bi-monthly)",
        ],
      },
      {
        name: "Gold Donor (Monthly)",
        amount: 25000,
        benefits: [
          "Can choose location for IT-enabled classroom",
          "Name placed inside the classroom",
          "Access to NEIEA website and annual audited tax returns",
          "Link to view live classroom teaching",
          "Invited to Donor Forum (bi-monthly)",
        ],
      },
      {
        name: "Platinum Donor (Monthly)",
        amount: 50000,
        benefits: [
          "Linked to sponsored Teacher",
          "Teacher answers donor's questions and invites donor to observe class",
          "Priority access to all NEIEA programs",
          "Personalized impact reports",
          "Invited to exclusive donor events",
        ],
      },
    ],
    quarterly: [
      {
        name: "Bronze Donor (Quarterly)",
        amount: 1500,
        benefits: [
          "Receives student progress reports quarterly",
          "Access to NEIEA website and annual audited tax returns",
          "Chat with NEIEA staff (2 hrs/day, Mon-Sat)",
        ],
      },
      {
        name: "Silver Donor (Quarterly)",
        amount: 30000,
        benefits: [
          "Linked to sponsored Coordinator",
          "Access to NEIEA website and annual audited tax returns",
          "Chat with NEIEA staff",
          "Invited to Donor Forum (bi-monthly)",
        ],
      },
      {
        name: "Gold Donor (Quarterly)",
        amount: 75000,
        benefits: [
          "Can choose location for IT-enabled classroom",
          "Name recognition in annual report",
          "Access to live classroom teaching sessions",
          "Invited to Donor Forum (bi-monthly)",
        ],
      },
      {
        name: "Platinum Donor (Quarterly)",
        amount: 150000,
        benefits: [
          "Linked to sponsored Teacher",
          "Priority access to all NEIEA programs",
          "Personalized impact reports",
          "Invited to exclusive donor events",
          "Opportunity to name a classroom",
        ],
      },
    ],
    annually: [
      {
        name: "Bronze Donor (Annual)",
        amount: 6000,
        benefits: [
          "Receives annual student progress report",
          "Access to NEIEA website and annual audited tax returns",
          "Invited to annual donor appreciation event",
        ],
      },
      {
        name: "Silver Donor (Annual)",
        amount: 120000,
        benefits: [
          "Linked to sponsored Coordinator",
          "Coordinator designated as Donor's Sponsor",
          "Access to NEIEA website and annual audited tax returns",
          "Invited to Donor Forum (bi-monthly)",
        ],
      },
      {
        name: "Gold Donor (Annual)",
        amount: 300000,
        benefits: [
          "Can choose location for IT-enabled classroom",
          "Name placed inside the classroom",
          "Featured in annual report",
          "Access to live classroom teaching sessions",
          "Invited to exclusive donor events",
        ],
      },
      {
        name: "Platinum Donor (Annual)",
        amount: 600000,
        benefits: [
          "Opportunity to name a learning center",
          "Dedicated NEIEA liaison",
          "VIP access to all programs and events",
          "Personalized impact reports with video updates",
          "Featured prominently in annual report",
        ],
      },
    ],
  };

  const formatAmount = (amount: number | string) => {
    const num = typeof amount === "string" ? parseFloat(amount) : amount;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(num);
  };

  const formatINR = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleDonateClick = () => {
    const donationData = {
      type: donationType,
      amount: selectedAmount,
      tier: selectedTier,
      customAmount: customAmount && !selectedAmount ? parseFloat(customAmount) : null,
    };

    navigate("/donation/form", { state: donationData });
  };

  const handleTierSelect = (tierName: string, amount: number) => {
    setSelectedTier(tierName);
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  return (
    <Layout>
      <section
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #F3F4F6 0%, #ffffff 50%, #F3F4F6 100%)',
          position: 'relative',
          overflow: 'hidden',
          padding: '80px 0'
        }}
      >
        {/* Background decorative elements */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
          <div style={{
            position: 'absolute',
            top: '-200px',
            right: '-200px',
            width: '400px',
            height: '400px',
            background: 'rgba(6, 3, 143, 0.05)',
            borderRadius: '50%',
            filter: 'blur(80px)'
          }}></div>
          <div style={{
            position: 'absolute',
            bottom: '-200px',
            left: '-200px',
            width: '400px',
            height: '400px',
            background: 'rgba(255, 103, 31, 0.05)',
            borderRadius: '50%',
            filter: 'blur(80px)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '300px',
            height: '300px',
            background: 'rgba(59, 130, 246, 0.03)',
            borderRadius: '50%',
            filter: 'blur(60px)'
          }}></div>
        </div>

        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 16px',
          position: 'relative',
          zIndex: 10
        }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            {/* Header Section */}
            <div style={{ textAlign: 'center', marginBottom: '48px', marginTop: '48px' }}>
              <h1 style={{
                fontSize: '3.5rem',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #06038F 0%, #3B82F6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '24px',
                fontFamily: 'Roboto, sans-serif'
              }}>
                Make a Difference
              </h1>
              <p style={{
                fontSize: '1.25rem',
                color: '#1F2937',
                maxWidth: '600px',
                margin: '0 auto',
                fontFamily: 'Roboto, sans-serif',
                lineHeight: '1.6'
              }}>
                Choose your donation frequency and amount to see the impact you'll make in transforming lives through education.
              </p>
            </div>

            <Card style={{
              border: 'none',
              boxShadow: '0 20px 60px -10px rgba(0, 0, 0, 0.15), 0 8px 12px -4px rgba(0, 0, 0, 0.1)',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              borderRadius: '24px',
              overflow: 'hidden'
            }}>
              <CardContent style={{ padding: '48px' }}>
                {/* Donation Type Toggle */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px', marginTop: '32px' }}>
                  <div style={{
                    backgroundColor: '#F3F4F6',
                    borderRadius: '16px',
                    padding: '6px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '4px'
                  }}>
                    {(["once", "monthly", "quarterly", "annually"] as const).map((type) => (
                      <button
                        key={type}
                        onClick={() => {
                          setDonationType(type);
                          setSelectedTier(null);
                          setSelectedAmount(null);
                        }}
                        style={{
                          padding: '12px 24px',
                          borderRadius: '12px',
                          fontWeight: '600',
                          transition: 'all 0.3s ease',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '1rem',
                          fontFamily: 'Roboto, sans-serif',
                          backgroundColor: donationType === type ? '#3B82F6' : 'transparent',
                          color: donationType === type ? 'white' : '#6B7280',
                          boxShadow: donationType === type ? '0 4px 12px rgba(59, 130, 246, 0.3)' : 'none'
                        }}
                      >
                        {type === "once" && "Give Once"}
                        {type === "monthly" && "Give Monthly"}
                        {type === "quarterly" && "Give Quarterly"}
                        {type === "annually" && "Give Annually"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tier Selection */}
                {(donationType === "monthly" || donationType === "quarterly" || donationType === "annually") && (
                  <div style={{ marginBottom: '32px' }}>
                    <h3 style={{
                      fontSize: '1.5rem',
                      fontWeight: '600',
                      color: '#1F2937',
                      marginBottom: '24px',
                      textAlign: 'center',
                      fontFamily: 'Roboto, sans-serif'
                    }}>
                      Select Donor Tier
                    </h3>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                      gap: '16px'
                    }}>
                      {donationTiers[donationType]?.map((tier) => (
                        <div
                          key={tier.name}
                          style={{
                            border: `2px solid ${selectedTier === tier.name ? '#3B82F6' : '#E5E7EB'}`,
                            borderRadius: '16px',
                            overflow: 'hidden',
                            transition: 'all 0.3s ease',
                            backgroundColor: 'white',
                            boxShadow: selectedTier === tier.name ? '0 8px 25px rgba(59, 130, 246, 0.15)' : '0 2px 8px rgba(0, 0, 0, 0.05)'
                          }}
                        >
                          <div
                            style={{
                              padding: '20px',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              cursor: 'pointer'
                            }}
                            onClick={() => handleTierSelect(tier.name, tier.amount)}
                          >
                            <div>
                              <h4 style={{
                                fontWeight: 'bold',
                                fontSize: '1.125rem',
                                color: '#1F2937',
                                marginBottom: '8px',
                                fontFamily: 'Roboto, sans-serif'
                              }}>{tier.name}</h4>
                              <p style={{
                                color: '#3B82F6',
                                fontWeight: '600',
                                fontSize: '1rem',
                                fontFamily: 'Roboto, sans-serif'
                              }}>
                                {formatINR(tier.amount)} ({formatAmount(tier.amount * 0.012)})
                              </p>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedTier(expandedTier === tier.name ? null : tier.name);
                              }}
                              style={{
                                color: '#3B82F6',
                                padding: '8px',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer'
                              }}
                            >
                              {expandedTier === tier.name ? (
                                <ChevronUp size={20} />
                              ) : (
                                <ChevronDown size={20} />
                              )}
                            </button>
                          </div>
                          {expandedTier === tier.name && (
                            <div style={{
                              padding: '16px 20px 20px 20px',
                              backgroundColor: '#F9FAFB',
                              borderTop: '1px solid #E5E7EB'
                            }}>
                              <ul style={{
                                listStyle: 'disc',
                                paddingLeft: '20px',
                                marginBottom: '16px',
                                color: '#374151',
                                fontFamily: 'Roboto, sans-serif'
                              }}>
                                {tier.benefits.map((benefit, i) => (
                                  <li key={i} style={{ marginBottom: '8px' }}>{benefit}</li>
                                ))}
                              </ul>
                              <button
                                onClick={() => handleTierSelect(tier.name, tier.amount)}
                                style={{
                                  width: '100%',
                                  padding: '12px',
                                  borderRadius: '8px',
                                  fontWeight: '500',
                                  border: 'none',
                                  cursor: 'pointer',
                                  fontSize: '1rem',
                                  fontFamily: 'Roboto, sans-serif',
                                  backgroundColor: selectedTier === tier.name ? '#3B82F6' : '#F3F4F6',
                                  color: selectedTier === tier.name ? 'white' : '#3B82F6',
                                  transition: 'all 0.3s ease'
                                }}
                              >
                                {selectedTier === tier.name ? "Selected" : "Select This Tier"}
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Amount Selection */}
                <div style={{ marginBottom: '32px' }}>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: '600',
                    color: '#1F2937',
                    marginBottom: '24px',
                    textAlign: 'center',
                    fontFamily: 'Roboto, sans-serif'
                  }}>
                    {selectedTier ? "Confirm Amount" : "Select Amount"}
                  </h3>

                  {!selectedTier && (
                    <>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                        gap: '16px',
                        marginBottom: '24px'
                      }}>
                        {quickAmounts.map((amount) => (
                          <button
                            key={amount}
                            onClick={() => {
                              setSelectedAmount(amount);
                              setCustomAmount("");
                              setSelectedTier(null);
                            }}
                            style={{
                              padding: '16px',
                              borderRadius: '12px',
                              fontWeight: '600',
                              transition: 'all 0.3s ease',
                              border: `2px solid ${selectedAmount === amount ? '#3B82F6' : '#E5E7EB'}`,
                              backgroundColor: selectedAmount === amount ? '#3B82F6' : 'white',
                              color: selectedAmount === amount ? 'white' : '#374151',
                              boxShadow: selectedAmount === amount ? '0 4px 12px rgba(59, 130, 246, 0.3)' : '0 2px 4px rgba(0, 0, 0, 0.05)',
                              cursor: 'pointer',
                              fontSize: '1rem',
                              fontFamily: 'Roboto, sans-serif'
                            }}
                          >
                            {formatINR(amount)}
                          </button>
                        ))}
                      </div>

                      <div style={{ position: 'relative' }}>
                        <Input
                          type="number"
                          placeholder="Custom amount (INR)"
                          value={customAmount}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val === "") {
                              setCustomAmount("");
                              setSelectedAmount(null);
                              setSelectedTier(null);
                              return;
                            }
                            const amount = parseFloat(val);
                            if (amount >= 1) {
                              setCustomAmount(val);
                              setSelectedAmount(amount);
                              setSelectedTier(null);
                            }
                          }}
                          style={{
                            textAlign: 'center',
                            fontSize: '1.25rem',
                            padding: '24px 16px',
                            border: '2px solid #E5E7EB',
                            borderRadius: '12px',
                            width: '100%',
                            fontFamily: 'Roboto, sans-serif',
                            transition: 'all 0.3s ease'
                          }}
                        />
                        <div style={{
                          position: 'absolute',
                          left: '16px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          color: '#6B7280',
                          fontSize: '1.25rem',
                          fontFamily: 'Roboto, sans-serif'
                        }}>
                          ₹
                        </div>
                      </div>
                    </>
                  )}

                  {selectedTier && (
                    <div style={{
                      textAlign: 'center',
                      padding: '32px',
                      backgroundColor: 'rgba(243, 244, 246, 0.5)',
                      borderRadius: '16px',
                      border: '1px solid #E5E7EB'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                        <div style={{
                          width: '64px',
                          height: '64px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '2rem',
                          backgroundColor: selectedTier.includes("Bronze") ? 'rgba(245, 158, 11, 0.2)' :
                            selectedTier.includes("Silver") ? 'rgba(156, 163, 175, 0.2)' :
                              selectedTier.includes("Gold") ? 'rgba(234, 179, 8, 0.2)' :
                                'rgba(59, 130, 246, 0.2)',
                          color: selectedTier.includes("Bronze") ? '#D97706' :
                            selectedTier.includes("Silver") ? '#6B7280' :
                              selectedTier.includes("Gold") ? '#B45309' :
                                '#3B82F6'
                        }}>
                          {selectedTier.includes("Bronze") && "🥉"}
                          {selectedTier.includes("Silver") && "🥈"}
                          {selectedTier.includes("Gold") && "🥇"}
                          {selectedTier.includes("Platinum") && "💎"}
                        </div>
                      </div>
                      <p style={{
                        fontSize: '1.125rem',
                        fontWeight: '600',
                        color: '#1F2937',
                        marginBottom: '8px',
                        fontFamily: 'Roboto, sans-serif'
                      }}>
                        {donationTiers[donationType as keyof typeof donationTiers]?.find((t: any) => t.name === selectedTier)?.name}
                      </p>
                      <p style={{
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        color: '#3B82F6',
                        marginBottom: '8px',
                        fontFamily: 'Roboto, sans-serif'
                      }}>
                        {formatINR(selectedAmount || 0)} ({formatAmount((selectedAmount || 0) * 0.012)})
                      </p>
                      <p style={{
                        color: '#6B7280',
                        marginBottom: '16px',
                        fontFamily: 'Roboto, sans-serif'
                      }}>
                        {donationType === "monthly" && "per month"}
                        {donationType === "quarterly" && "per quarter"}
                        {donationType === "annually" && "per year"}
                      </p>
                      <button
                        onClick={() => setSelectedTier(null)}
                        style={{
                          color: '#3B82F6',
                          textDecoration: 'underline',
                          fontSize: '0.875rem',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          fontFamily: 'Roboto, sans-serif'
                        }}
                      >
                        Choose different amount
                      </button>
                    </div>
                  )}
                </div>

                {/* Impact Preview */}
                <div style={{
                  marginBottom: '32px',
                  padding: '24px',
                  backgroundColor: 'rgba(224, 231, 255, 0.3)',
                  borderRadius: '16px',
                  border: '1px solid rgba(224, 231, 255, 0.5)'
                }}>
                  <h4 style={{
                    fontWeight: '600',
                    color: '#1F2937',
                    marginBottom: '12px',
                    textAlign: 'center',
                    fontSize: '1.125rem',
                    fontFamily: 'Roboto, sans-serif'
                  }}>
                    Your Impact
                  </h4>
                  <p style={{
                    color: '#374151',
                    textAlign: 'center',
                    fontSize: '1rem',
                    lineHeight: '1.6',
                    fontFamily: 'Roboto, sans-serif'
                  }}>
                    {selectedTier ? (
                      `As a ${selectedTier}, your contribution will support ${donationType === "monthly" ? "monthly" : donationType === "quarterly" ? "quarterly" : "annual"} ${selectedTier.includes("Gold") || selectedTier.includes("Platinum") ? "IT-enabled classroom development and teacher training" : "digital literacy programs and student scholarships"} for underserved communities.`
                    ) : selectedAmount ? (
                      `Your ${formatINR(selectedAmount)} ${donationType === "once" ? "one-time" : donationType} donation will support digital literacy training and educational innovation.`
                    ) : (
                      "Select an amount to see your potential impact."
                    )}
                  </p>
                </div>

                {/* Donate Button */}
                <Button
                  style={{
                    width: '100%',
                    background: 'linear-gradient(135deg, #06038F 0%, #3B82F6 100%)',
                    color: 'white',
                    fontWeight: 'bold',
                    padding: '24px',
                    fontSize: '1.25rem',
                    borderRadius: '16px',
                    border: 'none',
                    cursor: (!selectedAmount && !customAmount) ? 'not-allowed' : 'pointer',
                    opacity: (!selectedAmount && !customAmount) ? 0.5 : 1,
                    transition: 'all 0.3s ease',
                    fontFamily: 'Roboto, sans-serif',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    boxShadow: '0 8px 25px rgba(6, 3, 143, 0.3)'
                  }}
                  onClick={handleDonateClick}
                  disabled={!selectedAmount && !customAmount}
                >
                  {selectedTier ? (
                    <>
                      Become {selectedTier.split(" ")[0]} Donor
                      <Heart size={24} />
                    </>
                  ) : (
                    <>
                      Donate {selectedAmount ? formatINR(selectedAmount) : customAmount ? formatINR(parseFloat(customAmount)) : ""}
                      {donationType === "monthly" && " Monthly"}
                      {donationType === "quarterly" && " Quarterly"}
                      {donationType === "annually" && " Annually"}
                      <Heart size={24} />
                    </>
                  )}
                </Button>

                <p style={{
                  fontSize: '0.875rem',
                  color: '#6B7280',
                  textAlign: 'center',
                  marginTop: '16px',
                  fontFamily: 'Roboto, sans-serif'
                }}>
                  Secure SSL encryption. Tax-deductible receipt provided.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Donate;
