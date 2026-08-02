const fs = require('fs');
const path = require('path');
const https = require('https');

const dest = path.join(__dirname, '../public/covers');
if (!fs.existsSync(dest)) {
  fs.mkdirSync(dest, { recursive: true });
}

const images = [
  { name: 'super-subbu-bg.jpg', url: 'https://occ-0-2086-3662.1.nflxso.net/dnm/api/v6/x2x1Gn4QgTuVowyvC5vjsETMDK0/AAAABfiRsmX--b9JZs3L-lqM0avixbtdJNGaVygwQ9DXZnQZpSpeS3jUaCKfNk27G2S2P-rwMbL6-vAlxMfn1KzIt9jrdOlIKSaG-0AfsixKFKJIc7l9o1ayvwoO_g.webp?r=1b5' },
  { name: 'super-subbu-logo.png', url: 'https://occ-0-2086-3662.1.nflxso.net/dnm/api/v6/S4oi7EPZbv2UEPaukW54OORa0S8/AAAABRJ0FvDU5vzCjgwb23zmGrh2ajl95wj_2lcGhZJ0aEmXk_GJbtak6ZnUUuGkjHAfLZEoWRaCKfgjRTx9GQTfJM3RrEWe2r_WOq2b.webp?r=dfc' },
  { name: 'gatta-kusthi-2.jpg', url: 'https://occ-0-2086-3662.1.nflxso.net/dnm/api/v6/0Qzqdxw-HG1AiOKLWWPsFOUDA2E/AAAABQEw4arF4yiBOr_1qqnFYIJlnCtoH7O7MHApupHSOkT6KppDglM1EdyzLOITUGpTOrG2HTwU5ShqQ3nuifUJKJ4GhkbmO7jvy7EXobVfGjaRLOAr9iZqpDv2GzlNKAhRKiYIlg0qMLOeezgz.webp?r=631' },
  { name: 'gatta-kusthi-2-ranked.jpg', url: 'https://occ-0-2086-3662.1.nflxso.net/dnm/api/v6/mAcAr9TxZIVbINe88xb3Teg5_OA/AAAABVrLQsviQZx5yxbxISlVc7xmtaeX4WJAtzx95O5pFfaqnwyX6vWUnJ2bPk899ENCGtmgSkr294lLxufUBiEapAb92DagmZdsY1KTDyuD8-fTcE_M6I_2yw7t3rCcpKPu_bYfd1mNZ0uZxLbN_Uc_pwGu10kfkIuD0DvFcn0aGrRmNA.webp?r=374' },
  { name: 'peddi.jpg', url: 'https://occ-0-2086-3662.1.nflxso.net/dnm/api/v6/mAcAr9TxZIVbINe88xb3Teg5_OA/AAAABUsHdl35fhbTx1PrgS3J5zo-MQqkpNgZ2OF3_c7nvDUi737Q1rmtyy3bo13MEmjje79BezBKFjzi6aulgn3E2lV-YxW6aMxrbgwsdR6sJbGSvmBSKswI0Yp-z4x2n-aD9NXZBeSvkzQxOppJ8gca4nuf7IfIwvLGU9376vskAFdArQ.webp?r=fbc' },
  { name: 'con-city.jpg', url: 'https://occ-0-2086-3662.1.nflxso.net/dnm/api/v6/mAcAr9TxZIVbINe88xb3Teg5_OA/AAAABbwdtycFRB9Bw4gVp_mHkMNW9nmzOLzD0GwFkeYjlvgehIhZxR_4UPaVb9U_CpCwimYX6eShZXpt17ut61a_qGjI2-OlIzX-es5uPLShPLOw_ziOfM_6AAOM0GOVraf-kEge1Yob7CJ7oer1dI_U06DN0Wv78arKSXMvW04hHYXEgw.webp?r=78e' },
  { name: 'rao-bahadur.jpg', url: 'https://occ-0-2086-3662.1.nflxso.net/dnm/api/v6/0Qzqdxw-HG1AiOKLWWPsFOUDA2E/AAAABf3xrf9eCqr0zY6Cwl1Q-QnUxZGdC1Bt6kmM0qbacO1mcuhyJr2HTtjgWbXXMweyYD1wElpnLMKl34Ox4yPq5GFTt8nJ5HoxVrf0mlZdVBxbwukMBaH-9uK-Zf-8rqxZ5dfXtvWCNFxfFTnd.webp?r=b63' },
  { name: 'ikka.jpg', url: 'https://occ-0-2086-3662.1.nflxso.net/dnm/api/v6/mAcAr9TxZIVbINe88xb3Teg5_OA/AAAABdSyYs5TnkSBmaPy3t9KDJthWV-8ErZY4JCLlnZhBxNXeaKpl63bU4bH6b-TGi-Zmv-tkACOX_m3S2l02RbZtS6eNpCcDC24PqtWif266LmicFALM4y2_SaxnTsWHWY4EtfMPAqEY8Kab6MwTGuQDlQsC9uNdnBAEbownLgH7Baszg.webp?r=959' },
  { name: 'mikael.jpg', url: 'https://occ-0-2086-3662.1.nflxso.net/dnm/api/v6/0Qzqdxw-HG1AiOKLWWPsFOUDA2E/AAAABcKtngp8tbLsurEBnzbE8WLLUul32xOeeClaeh92CV31QjnE-UAufecNDVwwv0RBjOMAj3d45gOLq1fIqzR2BG3iaYJkDOIqX-A.webp?r=867' },
  { name: 'lock-upp.jpg', url: 'https://occ-0-2086-3662.1.nflxso.net/dnm/api/v6/0Qzqdxw-HG1AiOKLWWPsFOUDA2E/AAAABV1mg5K4FKjN8yX6VWRG16QdISUOgdNYtRBOoZwB9kjoVrlDhc4SDDevH8X888spRGZLe_HRfPWr4ZHW49HRMtPz4q5X_g_86G-aHBJYxgbzLNsoiag1DBqFvCjFI4xUK4QxiCh598Ku0ah4dV_runRZ7ngzPB0ofJdFC5ehQPZ_TI1yRlXyl0OpeE8ANowOsDuw_7vQRUGrrIiEbxd3w6WggGU9TUJlHJ1BSOu_f-RzNECIUpsNvVfB_Wg3pTrhY3SH8NXAFcW3VE0z0GcY8162yPbBF1NJ89M4sJmoVTor-cxv0fsRIpb0eSiuwNkE1uvnQ2dLd8F7vSz2To-jkHIqih2Lc7DfApkN.webp?r=0fc' },
  { name: 'chicago-pd.jpg', url: 'https://occ-0-2086-3662.1.nflxso.net/dnm/api/v6/0Qzqdxw-HG1AiOKLWWPsFOUDA2E/AAAABWELg0-n-2h_DsJAlYLEUVHIKSRa7ckDNJCuBHA1P5Q8j3id-_94x8-vjefd8-fTQreLdWkvbvEycvgoUYzi9m7NAHqPbDYs3BM.webp?r=20f' },
  { name: 'musafir-cafe.jpg', url: 'https://occ-0-2086-3662.1.nflxso.net/dnm/api/v6/0Qzqdxw-HG1AiOKLWWPsFOUDA2E/AAAABQUqsWVT7Nt02yz31ruQk0L2yfz-opv8MeZ0-_kTLTM-msWulb-8jd_Z7Aw75Sn2d_oeIyAbyh3mE1BetkISzcjL9mX-ZZZ4Vo9xeOxla3Vx86hUlYOY8gQ6LGpF_fQ6DRFlzOiNkcBbTeTq6paV0dFSYTRZXJL3e9EJzTqAjP7da7tHwAZdZ-76XlXPIxiPdHHWnCuMrVEOfEtiiTIV.webp?r=543' },
  { name: 'raakaasa.jpg', url: 'https://occ-0-2086-3662.1.nflxso.net/dnm/api/v6/0Qzqdxw-HG1AiOKLWWPsFOUDA2E/AAAABR6rYuyACAoHKRN_1_UtAQ4wIGDH37BAzrJ_zKJV81ct34PNWrbQG_oHjWBIZJnVw03uP481aGeXf5X6Z1XaT2ZMNrpEx7qlA5k.webp?r=29e' },
  { name: 'taskaree.jpg', url: 'https://occ-0-2086-3662.1.nflxso.net/dnm/api/v6/0Qzqdxw-HG1AiOKLWWPsFOUDA2E/AAAABXBz2Wl2g7zU7ka8X7xQUA4DE-S_78m4p5PeZ1mihlZrDgop3gVQ4hbGRZ_JGe3T_8MTINtBLPZJfTKuQ0-a2edSzT3IkHbeh2k.webp?r=fb2' },
  { name: 'super-subbu.jpg', url: 'https://occ-0-2086-3662.1.nflxso.net/dnm/api/v6/0Qzqdxw-HG1AiOKLWWPsFOUDA2E/AAAABXHpyCIEeCJNLlwnwXaE7vwV0eZyn_7cS6Ktcv4eJtZsgnBFasgro8-g56Ty3lYMADRuHigwwFjPNKdB5OGeEYjo9dLbDOBcg-0.webp?r=6f3' },
  { name: 'raja-shivaji.jpg', url: 'https://occ-0-2086-3662.1.nflxso.net/dnm/api/v6/0Qzqdxw-HG1AiOKLWWPsFOUDA2E/AAAABQSC7ob6FgpO3XRHVs9gNPq94Q3Vlj4tZBMkBdG-3VLvhupyHB2xj3rdliJxofe72v7PZAGyoxpPb-K27bbuCReZ_789Gv-LGAU.webp?r=aca' },
  { name: 'gatta-kusthi.jpg', url: 'https://occ-0-2086-3662.1.nflxso.net/dnm/api/v6/0Qzqdxw-HG1AiOKLWWPsFOUDA2E/AAAABUJFXrPB2a6UjxTQUGNSUnLhUZWkhN4ZSb406efLpUKiI2Fr952i3SVUUsuhPcdB_C0AiyCGInHcKX5KUrdod9cLGdxX6KWC7jU.webp?r=cd0' },
  { name: 'gurthukosthunnayi.jpg', url: 'https://occ-0-2086-3662.1.nflxso.net/dnm/api/v6/0Qzqdxw-HG1AiOKLWWPsFOUDA2E/AAAABcxLu61xBz1FbDyiUMcnzONLbZSFDKTjDyAjWQkVXV2xtiAcKjEMZLwBLsozIz78EqMUchTBEGiQ4aQ2l4cCK0OCn-SBPf6cH9RMsthpJv0kfBo789Ud2qWcU3oh5I5OgmcVMdeGd2DTHrGhHRWH4YRogQDSxT11eCwixF7tFuO4.webp?r=202' },
  { name: 'movie-29.jpg', url: 'https://occ-0-2086-3662.1.nflxso.net/dnm/api/v6/0Qzqdxw-HG1AiOKLWWPsFOUDA2E/AAAABWTRO90z9Yr8IzbJCfzyPamRjDYF7wmwBA7jZ0bBtw1YqPNujAGGiO4dOrIKZz-iDhj4ybaS80fnzKpr1jwNGEtuwdYubp9bTgw.webp?r=63e' },
  { name: 'elite-force.jpg', url: 'https://occ-0-2086-3662.1.nflxso.net/dnm/api/v6/0Qzqdxw-HG1AiOKLWWPsFOUDA2E/AAAABca98Da0zqCfEYF24Ku4Q2iBruKJSruWUuQmMxxvVyr7lF1qrfpA1UMZ_ziB6ZF-BCuWviF1zt-V49XZ4ZVNnAoBUJU5ORt2Neh4-Ipz22ez3Qbi-huh5DgIcdH8EOUFU_JTSApQhEKlkrg1BkBb-3IpASEh_unU7NjLReQHT23EfepgCgE6CsHdF9iCVNGtVWkVbT_xv71ohjcOrpK6.webp?r=d18' },
  { name: 'sniper.jpg', url: 'https://occ-0-2086-3662.1.nflxso.net/dnm/api/v6/0Qzqdxw-HG1AiOKLWWPsFOUDA2E/AAAABfCIttdJypP86W4Clc4SSKFeQHbQ8L5cvSTlpyQx01660RjjhdsptHm7R_KDHBiwO-tR15giuIofjmJC3TX5kpb4Esejy5oE5Smfg5LCwz_29fwdAWAMIBlUSRFwjCdke1hRMbRNLWTgb-tMfvEwVqyr5sFx-nxejivCY-tw4z3X.webp?r=30e' },
  { name: 'wwe-smackdown.jpg', url: 'https://occ-0-2086-3662.1.nflxso.net/dnm/api/v6/mAcAr9TxZIVbINe88xb3Teg5_OA/AAAABbYaZKZ0h_t5SECMc1FthqZHdsaIfV-V0J3Q6bvcTBTXyw-gFy4GhnGbkZ-3fGM8FVeELPld31fyorLxFq5wiZptK8psIn41HhpouQGSikkIo-VKgHlSScvqXaRjrVmCmZbEHZiHKCjSXr-wbwSpuXc_9jlSJIiw016agF-ADX8B1bX2f-2tle06ajhSoQLp84ndOk5uAZTdnR1hKMJ_qRZ12V-mdU7_N1G3Ba6Elph4JSGk9_TeZ_HyIqFYMS51VDHBo3ocfHqSh3QQ-u7rMVEoMiivDnu-tCTJJDpsTG5JYM55Lwmo.webp?r=f3c' },
  { name: 'spooky-in-love.jpg', url: 'https://occ-0-2086-3662.1.nflxso.net/dnm/api/v6/mAcAr9TxZIVbINe88xb3Teg5_OA/AAAABalcnpoa8qhmm3fhLJ_rvWrIwsxdhtwXue7kkKxgsRTNiWrZvMgGKu4CxtUSCCYCzQHJWoUk3LHCSKXVoRiEg4NRn6BvQItJFTQTYGg3QD1EY_vCFofBR5PyWxFV5DdpUNN7sAfss1IGYHE4LDS6cnvJQ8ebrFjEZdMVc6h4kM-q8dR1loM8zPRM_O2CBBK5FEaz36Y7HKs4LU1nVolxoApwSDx-6uibhZzVo2mBUoRJPYPqF07nmpS8jjT9vXipzoQLutbqEC0yKgv8yY0sqNxdQgVeJ6DlU4aXT0HTTsSFrXpgAiaKRmGKdeYJXw.webp?r=08d' },
  { name: 'ustaad-bhagat-singh.jpg', url: 'https://occ-0-2086-3662.1.nflxso.net/dnm/api/v6/0Qzqdxw-HG1AiOKLWWPsFOUDA2E/AAAABWNshfM2PQMFyt8WUVWY3I7QEZdHIO-CTGvWmRMr5EDmaOUtf6zBiJbnofUxtaKJp1C_6uNPFS3sLwSa3mHTgB_SYkeis29enJQ.webp?r=a4e' },
  { name: 'meiyazhagan.jpg', url: 'https://occ-0-2086-3662.1.nflxso.net/dnm/api/v6/0Qzqdxw-HG1AiOKLWWPsFOUDA2E/AAAABfK7aAv-GMnfe8DlIi-bCbhrBkjBEcggYpLCu3GcJpERgNH6dzXW7LaFxqjtfBsw7JofZ2wstfJmq9LRHrohMwP8qJM_BdI2SMg.webp?r=b4c' },
  { name: 'de-de-pyaar-de-2.jpg', url: 'https://occ-0-2086-3662.1.nflxso.net/dnm/api/v6/0Qzqdxw-HG1AiOKLWWPsFOUDA2E/AAAABdiF3zT76m02q_XtI2VT9k0j6igftj4zj-vqKjsBpldIyKGIxivzfvnME6i_EqtmvkTdjtzqqqJ6Z-wxmPr4UNx1ZhKnRiwtLHU.webp?r=551' },
  { name: 'mad.jpg', url: 'https://occ-0-2086-3662.1.nflxso.net/dnm/api/v6/0Qzqdxw-HG1AiOKLWWPsFOUDA2E/AAAABe7KxKBunWuwXviHfPduL_E3l0HZbdTdQHzSNhxfTLRV3IG8qu-s7m02VfasggWhYBfg38FAe8I_1bH6DIl8cx9FwjSLlXspw4Y.webp?r=bed' },
  { name: 'dragon.jpg', url: 'https://occ-0-2086-3662.1.nflxso.net/dnm/api/v6/0Qzqdxw-HG1AiOKLWWPsFOUDA2E/AAAABelhChhXYWxI1CBlhjHe5Xh6mF6KBTWl7Oc2rEhYKdiW9rmMa_hUmXQ8YlfXRZK_S6SULe7JULCVafwPNTioZUu_gNWYo12UYqg.webp?r=6d2' },
  { name: 'gumraah.jpg', url: 'https://occ-0-2086-3662.1.nflxso.net/dnm/api/v6/0Qzqdxw-HG1AiOKLWWPsFOUDA2E/AAAABW3vLAX_nHEMOWNskzp7g3pLC2Y60VisNI92ocC_1_YHm5e9sb-aK76E6G0o_Oq6kZJaX_VR-QXcbRpaZRC4U1wabH3N6yKqorY.webp?r=0c9' },
  { name: 'officer-on-duty.jpg', url: 'https://occ-0-2086-3662.1.nflxso.net/dnm/api/v6/0Qzqdxw-HG1AiOKLWWPsFOUDA2E/AAAABb6PqO-tR4twqvOJdfXCAok3FtUKmVn_KvT_zJLM4HMiC0u1lRxf4TuxyIK22p2JyVex90iFptQLAW-fTZsD9kOz1ocsEkULbVk.webp?r=9ae' },
  { name: 'glory.jpg', url: 'https://occ-0-2086-3662.1.nflxso.net/dnm/api/v6/0Qzqdxw-HG1AiOKLWWPsFOUDA2E/AAAABR9Es1R18BT9qaCkwimYovwpOispZCIO1eX95XhiK3I6jS_NKhDBcpadqpnvOyxur_1KHoGUL5bnSyk3KUnSy-N4bjXvxtBZhbI.webp?r=97b' },
  { name: 'thammudu.jpg', url: 'https://occ-0-2086-3662.1.nflxso.net/dnm/api/v6/0Qzqdxw-HG1AiOKLWWPsFOUDA2E/AAAABfvGttNkNqIeaJEr_fR5xEIzIeDOmb2dGtZOtwrcjqLVk2TPrrwBrfg7PlGNVYYcHhhfSrBHxDFEH_MRvUKhw3kX11Mz_JFiZJQ.webp?r=aef' },
  { name: 'test.jpg', url: 'https://occ-0-2086-3662.1.nflxso.net/dnm/api/v6/0Qzqdxw-HG1AiOKLWWPsFOUDA2E/AAAABRc_jPY5yLJml6W_Hqdyw76v07b3_SEfSgqUg-zIrCxhahwXSxjmFon925pkX149RwltBQAYO4mcm_l_mTPDxBK1uaJM6RBglO0.webp?r=7ae' },
  { name: 'thug-life.jpg', url: 'https://occ-0-2086-3662.1.nflxso.net/dnm/api/v6/0Qzqdxw-HG1AiOKLWWPsFOUDA2E/AAAABe3H7otRQWBFS0I2SCDraC4R08CwW3tFvffrw-VNokHJXFZTo7l0-vQX6T336Io-GUlUj_UBXn0smXtOjCtckbBDKDGq7yFZDnQ.webp?r=85d' },
  { name: 'hit-case-3.jpg', url: 'https://occ-0-2086-3662.1.nflxso.net/dnm/api/v6/0Qzqdxw-HG1AiOKLWWPsFOUDA2E/AAAABQM63PrdQp0tsfY4Z5NN_jCS6ToDE-10sIgiTFIQdaTgYAoAZtnnzwZV1b_3yYFUJOG0MXJJFz0Sco4zQ-sUbwF7BqIOYW-OkSU.webp?r=a53' },
  { name: 'mass-jathara.jpg', url: 'https://occ-0-2086-3662.1.nflxso.net/dnm/api/v6/0Qzqdxw-HG1AiOKLWWPsFOUDA2E/AAAABY65ibJLVd5mDtLwAV_yFvKpZdSqY0o9W1-wCIwQbtKtX7RYJD0z-L_vHA-_OSGPAGCUKQ957BzHtYNTw5hu0yXk9Y5464gtK8g.webp?r=20c' },
  { name: 'khufiya.jpg', url: 'https://occ-0-2086-3662.1.nflxso.net/dnm/api/v6/0Qzqdxw-HG1AiOKLWWPsFOUDA2E/AAAABRzaaZv9WSwWSkHQibFQrEDQiHSu1FVOdhZQ9wfm55jAZTlcj-sn00Cfq2tSRdfq8FcuewyKd5yNgCmE_sAgLk7xQRjafuW_0CY.webp?r=567' },
  { name: 'ulajh.jpg', url: 'https://occ-0-2086-3662.1.nflxso.net/dnm/api/v6/0Qzqdxw-HG1AiOKLWWPsFOUDA2E/AAAABZAm8Uj-elYYbcd1y6aWFC1VBUrYIISWrK74CpkRq5eMYwF-1VzHgKbJ_7XFJ0ikTVHTXLwQa24WrH7qk0fc6DS97W2po5VBtog.webp?r=b6a' },
  { name: 'dhurandhar.jpg', url: 'https://occ-0-2086-3662.1.nflxso.net/dnm/api/v6/0Qzqdxw-HG1AiOKLWWPsFOUDA2E/AAAABXjNI-oscFlA0n1TxIOUpjvv1ImSTGrwDac9EBvBSql0rb1XfxE68TkYbBjK1CXYmOlku_KPKRNAVn1hrrhvaHKK_EwFjFZ6D2c.webp?r=970' },
  { name: 'azaad.jpg', url: 'https://occ-0-2086-3662.1.nflxso.net/dnm/api/v6/0Qzqdxw-HG1AiOKLWWPsFOUDA2E/AAAABQ5gfSc8C2OUvufsMXRqOayg-XFq0qjS4SVRMOsc0s6j-1KMVWf9gBSzvNn9HOQsCbjFLOwjYIVOA_5ZBbn35kESgymOJTXD1A8.webp?r=1f0' },
  { name: 'article-370.jpg', url: 'https://occ-0-2086-3662.1.nflxso.net/dnm/api/v6/0Qzqdxw-HG1AiOKLWWPsFOUDA2E/AAAABenlF41JdaowZ5efOWF3ZKb_Pcl8c5VoBqD29FmKMi6zCF8h0nQbLLhxqv17_cJJERSWo4ChCWPU3W-TlfULux3JwOEa7CAcaLU.webp?r=932' },
  { name: 'delhi-crime.jpg', url: 'https://occ-0-2086-3662.1.nflxso.net/dnm/api/v6/0Qzqdxw-HG1AiOKLWWPsFOUDA2E/AAAABSor6TwowHOCF-FQ_XikaoftNuM-1FxqjvCeC45CSJis34HFhilYGIUALm06__8y9vVjCsoZZFjnK2UJseNEvzoHwzqG1wrLE3g.webp?r=619' },
  { name: 'the-game.jpg', url: 'https://occ-0-2086-3662.1.nflxso.net/dnm/api/v6/0Qzqdxw-HG1AiOKLWWPsFOUDA2E/AAAABXgtOJ6Qp67B9zQvETnvrv4EM7m6PNhQrMjSFUHWR6_NXOJAyUu-o-tdVdI5oMmW1pwYSyPRUEG4DGHQLhkJuUjzkO4SP_bDii4.webp?r=83f' },
  { name: 'jamtara.jpg', url: 'https://occ-0-2086-3662.1.nflxso.net/dnm/api/v6/0Qzqdxw-HG1AiOKLWWPsFOUDA2E/AAAABVsQW3oGzeoIWJrx0CJNAWqPmrus5DSoxf15RNFVYwyYkai6EwQTc-aNultIqCxmK-MXJT-MQcp18XKLjhiborS-i2EHwLrxcHA.webp?r=cfe' },
  { name: 'khakee.jpg', url: 'https://occ-0-2086-3662.1.nflxso.net/dnm/api/v6/0Qzqdxw-HG1AiOKLWWPsFOUDA2E/AAAABWQN0RRfdy7NURlcEUZIgil9luxZleQVOplwqJoxYjWq2b5JyV2cgZHZjPbdWi6vykpQF899oLS6GB8q1PH0F0ZFubi6XEXdK-k.webp?r=b33' },
  { name: 'dabba-cartel.jpg', url: 'https://occ-0-2086-3662.1.nflxso.net/dnm/api/v6/0Qzqdxw-HG1AiOKLWWPsFOUDA2E/AAAABdWw_5xGwx8DVwlcLl4KCdHjWRNVaka7G83k2pU34l0NvkcWlg80VZijWDlUhe0kWAerYhoc89WEk21w6Pn5WZCg0qsfcrF6He4.webp?r=b8c' },
  { name: 'pushpa-2.jpg', url: 'https://occ-0-2086-3662.1.nflxso.net/dnm/api/v6/0Qzqdxw-HG1AiOKLWWPsFOUDA2E/AAAABWh2FXDnXbAcQRVpFc5e2_4_HoTMayQt9n1FP2Err_JOM7OWlSQLMlnz08GTo4h-bHPD3cCs1OfdiglZ5s4pNGGRtrTN2NXoeAI.webp?r=af5' },
  { name: 'premante.jpg', url: 'https://occ-0-2086-3662.1.nflxso.net/dnm/api/v6/0Qzqdxw-HG1AiOKLWWPsFOUDA2E/AAAABc2kOCahkZC-6I5WL2AFn_cfidF8JM3fcB35GTF55eoXGi9P-fxVqkqnxTLzdNP3vUIY9sP9DHQUG01yjilVlt6REGElLV9VigQ.webp?r=e8f' },
  { name: 'guntur-kaaram.jpg', url: 'https://occ-0-2086-3662.1.nflxso.net/dnm/api/v6/0Qzqdxw-HG1AiOKLWWPsFOUDA2E/AAAABWBi9WLM7H0b24fNF6DOayja7aYnxL765KVSg1ARAijWcFQ5XECOXAqjnYFgYRLFs4Df0-6vpdg-atOA8vF3AMcH9cGbH74I9Y8.webp?r=7a6' },
  { name: 'the-girlfriend.jpg', url: 'https://occ-0-2086-3662.1.nflxso.net/dnm/api/v6/0Qzqdxw-HG1AiOKLWWPsFOUDA2E/AAAABaBM0iSAiFO-glvQbv1yVfhQJB_sMA5Tq0K-Xg9_rqr5ec80WUNEwSXyqhrzXiVJRsaFr7Ktsg2JPsVxMjyA6ePMGMNWWorRAAk.webp?r=d9b' },
  { name: '8-vasantalu.jpg', url: 'https://occ-0-2086-3662.1.nflxso.net/dnm/api/v6/0Qzqdxw-HG1AiOKLWWPsFOUDA2E/AAAABaBM5an-24H2N2xyQd_C_ZEcVkc23oZ7GiUnK0g2bgAE9t0XjDOyWk2ynxdizBA-tZoPhNQZfjFOYHr5hXi-Z8VHy7sLpl-7ex4.webp?r=096' },
  { name: 'sampradayini.jpg', url: 'https://occ-0-2086-3662.1.nflxso.net/dnm/api/v6/0Qzqdxw-HG1AiOKLWWPsFOUDA2E/AAAABdPdvaPKSye0RYvS6WUcWZEojBpNkR0vgHI59hF29IbT_v68s6oazF9YW1gxu89pQHh3yDZWRL6Qp5-q9yCD0veFcBHRpklCoH8.webp?r=406' },
  { name: 'anaganaga.jpg', url: 'https://occ-0-2086-3662.1.nflxso.net/dnm/api/v6/0Qzqdxw-HG1AiOKLWWPsFOUDA2E/AAAABWH5FyjnXAOwSszLRCnAWJv3bX4TNurrSjH2eNyTwPNX8pklggpCYSg5lTW3XW5CK-MaYbwxAJOsiCv9hwaLHRB42ojVoCkWyWY.webp?r=30c' },
  { name: 'pakka-commercial.jpg', url: 'https://occ-0-2086-3662.1.nflxso.net/dnm/api/v6/0Qzqdxw-HG1AiOKLWWPsFOUDA2E/AAAABeFh20MG2FPiqd2_Y_1D7obkobHjvsT0sscpKxI_rXZGUoCl_nCF3HVnWVfCVWOAgQmuVr9PXeh3X2wMKTcWc1KT5XkEoowdyGQ.webp?r=0c3' },
  { name: 'little-hearts.jpg', url: 'https://occ-0-2086-3662.1.nflxso.net/dnm/api/v6/0Qzqdxw-HG1AiOKLWWPsFOUDA2E/AAAABfbDHqdIbUwnH4DkWwoMoFUm2Ptbgw61i1Cmkxwh0jpuJVCRjfJ4iM4o6PGd9ySQMbOUevv4Ly57S-FrURgc86wv03BSmCD0aUo.webp?r=954' },
  { name: 'miss-shetty.jpg', url: 'https://occ-0-2086-3662.1.nflxso.net/dnm/api/v6/0Qzqdxw-HG1AiOKLWWPsFOUDA2E/AAAABXnVNgentFR98wQbwel5Z_XQa51fV3OopnzDaUjdokR-HggSHiLh00Vg93i92v5ds9ZPr1IPHiqSV_L6Ri4HIxE-TbTyMmmd99I.webp?r=39b' },
  { name: 'avatar-airbender.jpg', url: 'https://occ-0-2086-3662.1.nflxso.net/dnm/api/v6/0Qzqdxw-HG1AiOKLWWPsFOUDA2E/AAAABWY4lh6JX0V-4HltnTDPSASnW_yVBXC5A75pFOP8rvqfBzDKpZuUBZAmm_KwMaZdXrKDsaoM1sWeZQqRMakb56i2jp_2ElfGKUA.webp?r=faa' },
  { name: 'aquaman.jpg', url: 'https://occ-0-2086-3662.1.nflxso.net/dnm/api/v6/0Qzqdxw-HG1AiOKLWWPsFOUDA2E/AAAABdkasDc9lgPfDw7Lam1ezpwM943zxWcI8TlpkrzGL94nl5FYQlBBHnYFp34IJinpgSvmReRAqF6FrUQJgT_QG7qOrCX7EBTB28w.webp?r=845' },
  { name: 'one-piece.jpg', url: 'https://occ-0-2086-3662.1.nflxso.net/dnm/api/v6/0Qzqdxw-HG1AiOKLWWPsFOUDA2E/AAAABX1guXhT4qHydhUDgRKz3ujlFt1e8xrfEMDW_dFY-3Okrp3x_EDUqKbV21HrkCn19Bi_8aiJiLAtPrM-leu3hkwbDRXaV-kz2bs.webp?r=70d' },
  { name: 'stranger-things.jpg', url: 'https://occ-0-2086-3662.1.nflxso.net/dnm/api/v6/0Qzqdxw-HG1AiOKLWWPsFOUDA2E/AAAABWuLZbbdn5s15J1jvY9bcLNKmKymUFR4wpiwTXEG-p-IQXo3Pa0vtECax9xDFlabkvk3FPp97aBqvJBTT3U_j-6ayg2PMnVZpEmCQOhFIOXG8VBDIlRKJ19DEM-WxBbPhSIKOzoyHpRswytsMKWTN6v6jhcyosAP3Gc3F7uGiJdYe3GVDLntlmWMCzhH1a-Fx9CaW5U.webp?r=dce' },
  { name: 'spellbound.jpg', url: 'https://occ-0-2086-3662.1.nflxso.net/dnm/api/v6/0Qzqdxw-HG1AiOKLWWPsFOUDA2E/AAAABeCTRZ0RuaRnjC6NBgHcwQ1wd1RbJ5W1jtSZjuHGGfBHxFem2_oZ7ytIUNc8hLtLAgY2DgQWqkDreuA_nkJT7OsxeYTsU1UmuX8.webp?r=652' }
];

async function download() {
  for (const item of images) {
    const file = path.join(dest, item.name);
    try {
      await new Promise((resolve, reject) => {
        const fileStream = fs.createWriteStream(file);
        https.get(item.url, (res) => {
          if (res.statusCode === 301 || res.statusCode === 302) {
            https.get(res.headers.location, (res2) => {
              res2.pipe(fileStream);
              fileStream.on('finish', resolve);
            }).on('error', reject);
          } else {
            res.pipe(fileStream);
            fileStream.on('finish', resolve);
          }
        }).on('error', reject);
      });
      console.log('Downloaded:', item.name);
    } catch (e) {
      console.error('Error downloading:', item.name, e.message);
    }
  }
}

download();
