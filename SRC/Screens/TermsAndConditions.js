import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import { windowHeight, windowWidth } from '../Utillity/utils';
import ScreenBoiler from '../Components/ScreenBoiler';
import Loader from '../Components/Loader';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import moment from 'moment/moment';

const TermsAndConditions = () => {
  const userRole = useSelector(state => state.commonReducer.selectedRole);

  const [isLoading, setIsLoading] = useState(false);

  const termsContent = `
READ THE FOLLOWING TERMS OF SERVICE BEFORE USING REFLECTLY.APP, REFLECT.LY, REFLECTLY.IO (COLLECTIVELY THE 'SITE') OR USING OUR MOBILE APPLICATION (OUR 'APP'). 
BY UTILIZING OUR APP, OR ACCESSING ANY PAGE ON OUR SITE, YOU AGREE TO BE BOUND BY THE CURRENT VERSION OF OUR TERMS OF SERVICE AND PRIVACY POLICY.

1. General         
Welcome to the website and App of QBIDnow.com ('QBID', 'we', 'us'). QBID provides a communication between parties to negotiate a better price on a project, repair, service, or any service’s needing to be negotiated.  service and for Users who register accounts through the Site, or who download and install our App (hereinafter the Site and App may be collectively referred to as the 'Service'). 

2. Acceptance of the Terms of Use
We ask that you review and abide by these Terms and Conditions, our Privacy Policy, and any other terms and conditions that may appear on the Site from time to time. Your use of the Service constitutes your agreement to these Terms and Conditions, and we reserve the right to revise these Terms and Conditions at any time without notice to you. When we make revisions, we will post them on the Site and they will be effective immediately upon posting. You agree to check this section periodically to be aware of any changes to the Terms and Conditions. YOUR CONTINUED USE OF THE SERVICES AFTER THE POSTING OF ANY REVISIONS SHALL BE CONSIDERED YOUR AGREEMENT TO THE MODIFIED TERMS AND CONDITIONS. If you do not agree to these Terms and Conditions, please do not use the Service. The Service is offered and available to users who are 16 years of age or older. By using the Services, you represent and warrant that you are of legal age to conduct buisness with QBIDnow.com and meet all of the foregoing eligibility requirements. If you do not meet all of these requirements, you must not access or use the Service. The Service and its Content are intended solely for personal and non-commercial use by you. Any use of the Service or its Content other than for personal and non-commercial purposes is strictly prohibited. 
  
3. What We Own
Unless otherwise noted, all material and services available on the Site or through the App, and all material and services provided by or through the Service, its affiliates, subsidiaries, employees, agents, licensors or other commercial partners including, but not limited to, software, all informational text, software documentation, design of and 'look and feel,' layout, photographs, graphics, audio, video, messages, interactive and instant messaging, design and functions, files, documents, images, or other materials, whether publicly posted or privately transmitted as well as all derivative works thereof (collectively, the 'Content') are the intellectual property of QBIDnow, our licensors, and our contributors. The Content is protected by copyright, trademark, trade-dress, and any other applicable national or international intellectual property laws. All QBID trademarks and service marks, logos, slogans and taglines are the property of QBID. All other trademarks, service marks, logos, slogans and taglines are the property of their respective owners. Except as otherwise specifically provided herein, nothing should be construed as granting any license or right to use any trademarks, service marks, logos, slogans or taglines displayed on QBID without our express written permission, or the express written permission of such third-party that may own the trademark, service mark, logo, slogan or tagline. 

4. Our License to You 



Subject to this Agreement, QBID hereby grants you a limited, revocable, non-transferable and non-exclusive license to use the Service through a user identification reference provided by QBID ('User ID') to the extent, and only to the extent, necessary to access and use our Service in accordance with the terms of this Agreement. This license does not permit you, and you agree not to: store, copy, reproduce, republish, modify, upload, post, translate, scrape, rent, lease, loan, sell, distribute, transfer, transmit, display, decompile, reverse engineer, reverse assemble, decipher or otherwise attempt to discover any programming code or any source code used in or with the Service or otherwise distribute in any way the components of the Service other than as specifically permitted in this Agreement. You may not sell, assign, sublicense, grant a security interest in or otherwise attempt to transfer any right in the Service, create derivative works based on or in any manner commercially exploit the Service, in whole or in part, other than as expressly permitted in this Agreement. Any use of the Service for any purpose other than as specifically permitted herein or without our prior consent or the prior written consent of our licensors, as applicable, is expressly prohibited. We reserve all rights not expressly granted in this Agreement. 

5. Use of the Service 
We reserve the right to withdraw or amend this Site, our App, and any Service or material we provide, including the text messaging and wellness audio content services, in our sole discretion without notice. We will not be liable if, for any reason, all or any part of the Site or Service is unavailable at any time or for any period. From time to time, we may restrict access to some parts of the Site, or our App, to users, including registered users. To access the Service, you may be asked to provide certain registration details or other information, including a valid cellphone number, and to link an Apple Pay account. It is a condition of your use of the Service that all the information you provide on the Site to use the Service is correct, current and complete. You agree that all information you provide to register with this Site or App, including but not limited to through the use of any interactive features, is governed by our Privacy Policy, and you consent to all actions we take with respect to your information consistent with our Privacy Policy. Purchasers of our Premium subscription will need to pay for a monthly or annual subscription prior to unlocking Premium content. All sales are final, and we do not offer refunds for our Premium subscription. If you choose, or are provided with a username, password or any other piece of information as part of our security procedures, you must treat such information as confidential, and you must not disclose it to any other person or entity. You also acknowledge that your account is personal to you and agree not to provide any other person with access to the Service using your user name, password, cell phone number, or other security information. You agree to notify us immediately of any unauthorized access to or use of your username or password or any other breach of security. You also agree to ensure that you exit from your account at the end of each session. You should use particular caution when accessing your account from a public or shared computer so that others are not able to view or record your password or other personal information. We have the right to disable any user name, cell phone number associated with an account, password, or other identifier, whether chosen by you or provided by us, at any time in our sole discretion for any or no reason, including if, in our opinion, you have violated any provision of these Terms of Service or our Privacy Policy. 

6. Reliance on the Information Sent 
The information sent via QBID’s Service, or presented on or through the Site or our App, is made available solely for general information purposes. We do not warrant the accuracy, completeness, usefulness, or safety of this information. Any reliance you place on such information is strictly at your own risk. WE DISCLAIM ALL LIABILITY AND RESPONSIBILITY ARISING FROM ANY RELIANCE PLACED ON SUCH INFORMATION BY YOU OR ANY OTHER VISITOR TO THE SITE, OR BY ANYONE WHO MAY BE INFORMED OF ANY OF ITS CONTENTS OR THE CONTENTS OF THE SERVICE. 

7. Content You Provide to Us 
You are legally responsible for all information, data, text, software, music, sound, photographs, graphics, video, messages or other Content uploaded, posted or stored in connection with your use of the QBID Service. QBID is not responsible for your Content. You hereby grant QBID a worldwide, royalty-free, non-exclusive license to host and use the Content in order to provide you with the Service, and hereby represent and warrant that you have all the rights necessary to grant us such license. You are responsible for any Content that may be lost or unrecoverable through your use of the Service. You are encouraged to archive your Content regularly and frequently. All information we collect on this Site, through our App, or through your use of the Service is subject to our Privacy Policy. By using the Site, App, and Service, you consent to all actions taken by us with respect to your information in compliance with the Privacy Policy. 

8. Geographic Restrictions 
The owner of the Service is based in USA. Access to the Service may not be legal by certain persons or in certain countries. If you access the Service from outside Denmark, you do so on your own initiative and are responsible for compliance with local laws and cell phone service provider rates and terms of service. 
9. Image and Video 
QBID may send or display images, audio, and video (the 'Material') from time to time. The types of Material Users are authorized to access on the Site includes Material commissioned by QBID, embedded Material, Material we believe to be covered by the Fair Use Doctrine, Material from photographic archive and video vendors, and Material supplied to our staff or released into the public domain by public relations and marketing companies for press purposes. 
10. Copyright Notices 
If QBID publishes Material that you think infringes your copyright, please click her www.qbidnow.com  and email us at and we will address your concerns. We reserve the right, at our sole discretion, to remove any Content without prior notice. 
11. Accuracy of Information 
While we strive for accuracy, information on the site may sometimes contain errors or inaccuracies. QBID does not make any warranty as to the correctness or reliability of the site's content or any text messages we send out to Users. 

12. Email Correspondence 
Emails sent to thru our website, www.qbidnow.com  are considered our property. You can read more about this in our Privacy Policy. 

13. Links 
Our Site will occasionally contain links to, and quotation of, Material from other sites. QBID is responsible for neither the content nor the privacy practices of other sites. We encourage our users to be aware when they leave QBID’s Site, and to read the privacy statements of any website that may collect personally identifiable information. 

14. Information Security 
No data transmission over the Internet can be guaranteed to be 100% safe. Thus, we cannot warrant that your information will be absolutely secure. QBID has a variety of safeguards – technical, administrative, – in place to help protect against unauthorized access to, use, or disclosure of user information. 

15. The Legal Stuff – Disclaimer and Limitation of Liability 
EXCEPT AS EXPRESSLY SET FORTH IN THESE TERMS AND CONDITIONS, YOU EXPRESSLY UNDERSTAND AND AGREE THAT THE SITE, CONTENT, PRODUCTS AND/OR SERVICE ON THE SITE OR ELSEWHERE ARE PROVIDED 'AS IS' AND ON AN 'AS AVAILABLE' BASIS. TO THE FULLEST EXTENT PERMITTED BY LAW AND EXCEPT AS EXPRESSLY SET FORTH IN THESE TERMS AND CONDITIONS, REFLECTLY DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. R DOES NOT REPRESENT OR WARRANT THAT THE SITE WILL BE UNINTERRUPTED OR ERROR-FREE, THAT ANY DEFECTS WILL BE CORRECTED, OR THAT THE SITE OR THE SERVER THAT MAKES THE SITE AVAILABLE ARE FREE FROM VIRUSES OR ANYTHING ELSE HARMFUL. FURTHER, EXCEPT AS EXPRESSLY SET FORTH IN THESE TERMS AND CONDITIONS, REFLECTLY MAKES NO WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY, ADEQUACY, USEFULNESS, RELIABILITY, OR COMPLETENESS OF THE SITE, TEXT MESSAGES, SERVICES, CONTENT, THE CONTENT OF ANY THIRD-PARTY SITE LINKED TO OR FROM THIS SITE, COMMENTS, INFORMATION, INFORMATION PROVIDED BY US OR OUR VENDORS, OR ANY OTHER ITEMS OR MATERIALS ON THE SITE OR LINKED TO FROM THE SITE. 
QBID ASSUMES NO LIABILITY OR RESPONSIBILITY FOR (A) ANY, ERRORS, MISTAKES OR INACCURACIES OF THE CONTENT, PRODUCTS, SERVICES, INFORMATION, SITE AND MATERIALS SET FORTH ON OR MADE AVAILABLE THROUGH THE SITE, (B) PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS TO OR USE OF THE SITE, PRODUCTS, SERVICES OR ANY THIRD PARTY SITE(S), PRODUCTS OR SERVICES, (C) ANY UNAUTHORIZED ACCESS TO OR USE OF THE SERVERS THAT HOST THE SITE OR ANY THIRD PARTY SITE(S) AND/OR ANY AND ALL PERSONAL INFORMATION STORED THEREIN, (D) ANY INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM THE SITE OR THIRD PARTY SITE(S), (E) ANY BUGS, VIRUSES, TROJAN HORSES OR THE LIKE, WHICH MAY BE TRANSMITTED TO OR THROUGH THE SITE OR ANY THIRD PARTY SITE(S) BY REFLECTLY OR ANY THIRD PARTY, AND/OR (F) ANY ERRORS OR OMISSIONS IN THE NETWORK OR ANY CONTENT, INFORMATION AND MATERIALS (INCLUDING BUT NOT LIMITED TO THIRD PARTY SITE(S)) OR FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF ANY OF THE FOREGOING. 
NO PERSON (INCLUDING ANY AGENT, DEALER OR REPRESENTATIVE OF REFLECTLY) IS AUTHORIZED TO MAKE ANY REPRESENTATION OR WARRANTY CONCERNING REFLECTLY'S SITE AND SERVICES, AND YOU ACKNOWLEDGE AND AGREE THAT YOU HAVE NOT RELIED ON ANY OTHER WARRANTIES OR REPRESENTATIONS. 
IN NO EVENT SHALL REFLECTLY OR ITS SUBSIDIARIES, AFFILIATES, AGENTS, SUPPLIERS, VENDORS, MANUFACTURERS OR DISTRIBUTORS BE LIABLE FOR ANY INDIRECT, SPECIAL, PUNITIVE, INCIDENTAL, EXEMPLARY OR CONSEQUENTIAL DAMAGES, INCLUDING, WITHOUT LIMITATION, DAMAGES FOR LOSS OF USE, DATA, REVENUE OR PROFITS, BUSINESS INTERRUPTION, OR LOSS OF BUSINESS OPPORTUNITY OR GOODWILL, ARISING FROM OR IN CONNECTION WITH (A) THE USE OF, OR INABILITY TO USE, THE SITE; (B) THE PROVISION OF OR FAILURE TO PROVIDE SERVICES, MATERIALS, CONTENT, OR SOFTWARE AVAILABLE FROM, ON OR THROUGH THE SITE OR ANY THIRD-PARTY WEBSITE(S); OR (C) THE CONDUCT OF OTHER USERS OF THE SITE, WHETHER BASED ON CONTRACT, TORT, NEGLIGENCE, STRICT LIABILITY OR OTHERWISE, EVEN IF REFLECTLY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. YOU ASSUME COMPLETE RESPONSIBILITY FOR YOUR USE OF THE SITE. YOUR SOLE REMEDY AGAINST REFLECTLY FOR DISSATISFACTION WITH THE SITE OR ANY CONTENT IS TO STOP USING THE WEBSITE. THAT SAID, IF REFLECTLY IS FOUND TO BE LIABLE TO YOU FOR ANY DAMAGE OR LOSS ARISING OUT OF OR WHICH IS IN ANY WAY CONNECTED WITH YOUR USE OF THE SITE, ANY CONTENT, OR PURCHASE OF ANY PRODUCTS OR SERVICES ON OR THROUGH THE SITE, REFLECTLY'S LIABILITY SHALL NOT EXCEED $100.00 IN THE AGGREGATE. 

16. Arbitration 
For any dispute you have with QBID, you agree to first contact us at WWW.QBIDBNOW.COM  and attempt to resolve the dispute with us informally. If QBID has not been able to resolve the dispute with you informally, we each agree to resolve any claim, dispute, or controversy (excluding claims for injunctive or other equitable relief) arising out of or in connection with or relating to these Terms by binding arbitration by the Denton County Texas Rules and Supplementary Procedures for Consumer Related Disputes then in effect for the AAA, except as provided herein. Unless you and QBID agree otherwise, the arbitration will be conducted in the county where QBID's headquarters are located (Austin TX). Each party will be responsible for paying any filing, administrative and arbitrator fees in accordance with Denton Country Court & Rules. 

17. Termination 
These Terms of Service are effective unless and until terminated by either you or QBID. You may terminate these Terms of Service as they apply to you at any time by ceasing to use the Site. QBID may terminate these Terms of Service at any time immediately and without notice, and accordingly deny you access to the Site, for any reason in its sole discretion; however, the provisions in these Terms of Service that relate to intellectual property, indemnification, disclaimer, limitation of liability, and choice of law shall survive any termination of these Terms of Service. 

18. Entire Agreement 
These Terms of Service (together with our Privacy Policy, which is expressly incorporated herein by reference and which can be accessed on this Site, and any other terms that may appear on the Site from time-to-time) contain the entire understanding a and supersede all prior agreements, terms, conditions and understandings, both written and oral, with respect to such use and access of the Site. No representation, statement or inducement, whether oral or written, not contained in these Terms of Service (and any other terms that may appear on the Site from time-to-time) or the Privacy Policy shall bind any party to this agreement. No additional or different terms or conditions will be binding upon us unless expressly agreed to in writing by an officer of QBID. No other representative has any authority to waive, alter, vary or add to these Terms of Service. Before using this Site please read through all referenced documents carefully. 

19. Severability 
If any portion of these Terms of Service is held to be invalid or unenforceable, the invalid or unenforceable portion shall be modified in accordance with the applicable law with a provision that most closely reflects the intention of the original provision, and the remainder of these Terms of Service shall remain in full force and effect. The failure of QBID to insist upon or enforce strict performance by you of any provision of these Terms of Service shall not be construed as a waiver of any provision or right. 

20. Changes to our Terms of Service 
We may revise and update these Terms of Service from time to time at our sole discretion. All changes are effective immediately when we post them, and apply to all access to and use of the Site thereafter. However, any changes to the dispute resolution provisions set forth in Governing Law and Jurisdiction and Arbitration above will not apply to any disputes for which the parties have actual notice on or prior to the date the change is posted on the Site. Your continued use of the Website following the posting of revised Terms of Service means that you accept and agree to the changes. You are expected to check this page from time to time so you are aware of any changes, as they are binding on you. 

21. Notice of Changes and Use of Terms of Service 
We may provide notice to you relating to the Site and/or these Terms of Service by sending an email to your last known email address, and any such notice shall be deemed given and received on the day it is sent. A printed version of these Terms of Service and of any notice given to you in electronic form or otherwise shall be admissible in judicial or administrative proceedings based upon or relating to these Terms of Service to the same extent and subject to the same conditions as other business documents and records originally generated and maintained in printed form. You agree that any cause of action that you may desire to bring arising out of or related to these Terms of Service and/or the Site must commence within one (1) year after the cause of action arises. you are responsible for compliance with all local laws. www.qbidnow.com
   `;

  return (
    <ScreenBoiler
      showHeader={true}
      statusBarBackgroundColor={
        userRole == 'Qbid Member'
          ? Color.themeBgColor
          : userRole == 'Qbid Negotiator'
            ? Color.themeBgColorNegotiator
            : Color.themebgBusinessQbidder
      }
      statusBarContentStyle={'light-content'}
      headerColor={
        userRole == 'Qbid Member'
          ? Color.themeBgColor
          : userRole == 'Qbid Negotiator'
            ? Color.themeBgColorNegotiator
            : Color.themebgBusinessQbidder
      }
      hideUser={false}
      showBack={true}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ minHeight: windowHeight * 0.7 }}>
        <LinearGradient
          style={{
            paddingVertical: moderateScale(30, 0.6),
            paddingHorizontal: moderateScale(10, 0.6),
            minHeight: windowHeight * 0.97,
          }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={
            userRole == 'Qbid Member'
              ? Color.themeBgColor
              : userRole == 'Qbid Negotiator'
                ? Color.themeBgColorNegotiator
                : Color.themebgBusinessQbidder
          }>
          {isLoading ? (
            <View style={styles.loaderView}>
              <Loader
                bgColor={'transparent'}
                height={windowHeight * 0.8}
                width={windowWidth * 0.9}
                size={'large'}
                text={true}
              />
            </View>
          ) : (
            <>
              <CustomText
                style={{
                  color: Color.themeBlack,
                  marginTop: moderateScale(20, 0.3),
                  fontSize: moderateScale(18, 0.3),
                  fontWeight: 'bold',
                }}>
                Terms of Services
              </CustomText>
              <CustomText
                style={{
                  marginTop: moderateScale(8, 0.3),
                  color: Color.white,
                  textAlign: 'left',
                  lineHeight: moderateScale(20, 0.3),
                  fontSize: moderateScale(11, 0.3),
                }}>
                {termsContent}
              </CustomText>
            </>
          )}
        </LinearGradient>
      </ScrollView>
    </ScreenBoiler>
  );
};

const styles = ScaledSheet.create({
  loaderView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TermsAndConditions;
