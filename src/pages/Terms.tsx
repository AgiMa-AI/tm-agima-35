
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/50 to-background flex flex-col items-center p-4 overflow-hidden">
      <div className="w-full max-w-3xl my-8">
        <div className="mb-6">
          <Link to="/login">
            <Button variant="ghost" className="group flex items-center gap-2 hover:bg-primary/5">
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span>返回登录</span>
            </Button>
          </Link>
        </div>
        
        <Card className="rounded-2xl shadow-xl border-0 tiffany-shadow animate-fade-in overflow-hidden backdrop-blur-sm">
          <CardHeader className="space-y-1 px-5 py-5 sm:px-6 bg-primary/5">
            <CardTitle className="text-2xl font-bold brand-text-gradient">腾目科技 - 服务条款</CardTitle>
            <CardDescription>
              请仔细阅读以下服务条款
            </CardDescription>
          </CardHeader>
          
          <CardContent className="px-5 sm:px-6 py-6 space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">1. 服务协议</h2>
              <p className="text-muted-foreground">
                欢迎使用腾目科技网络有限公司（以下简称"腾目科技"、"我们"）提供的算力 AGI租赁服务。本服务条款（以下简称"条款"）是您与腾目科技之间关于您使用腾目科技提供的服务所订立的协议。
              </p>
              <p className="text-muted-foreground">
                您在使用腾目科技的服务之前，应当仔细阅读本条款，确保您已经理解并接受本条款的全部内容。一旦您开始使用腾目科技的服务，即表示您已同意接受本条款的全部内容以及腾目科技不时发布的关于该服务的相关规则。
              </p>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">2. 服务内容</h2>
              <p className="text-muted-foreground">
                腾目科技提供的算力 AGI租赁服务（以下简称"服务"），是指腾目科技通过互联网向用户提供的人工智能算力资源租赁、管理和相关服务的总称。
              </p>
              <p className="text-muted-foreground">
                腾目科技有权随时对服务内容进行单方面的变更，并以网站公告、电子邮件或其他方式予以通知。
              </p>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">3. 用户账号</h2>
              <p className="text-muted-foreground">
                您在使用服务前需要注册腾目科技账号。您应当提供真实、准确、完整、合法有效的个人资料，并在资料发生变更时及时更新。
              </p>
              <p className="text-muted-foreground">
                您须对账号安全负责，包括妥善保管您的账号和密码，以及对您账号下的所有活动承担责任。如发现他人未经授权使用您的账号，应立即通知腾目科技。
              </p>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">4. 服务费用</h2>
              <p className="text-muted-foreground">
                服务的计费标准由腾目科技制定并公示于官方网站或平台内。腾目科技有权根据市场情况调整计费标准，并提前通知用户。
              </p>
              <p className="text-muted-foreground">
                用户应按时支付服务费用。逾期未支付的，腾目科技有权暂停或终止服务，并不免除用户应付的费用。
              </p>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">5. 用户行为规范</h2>
              <p className="text-muted-foreground">
                用户应遵守中华人民共和国法律法规及国际惯例，不得利用腾目科技服务从事违法违规行为，包括但不限于：
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 pl-4">
                <li>违反国家法律法规、政策的行为</li>
                <li>威胁、骚扰、侵犯他人隐私等侵害他人合法权益的行为</li>
                <li>利用服务进行任何可能对互联网正常运转造成不利影响的行为</li>
                <li>利用腾目科技提供的服务从事任何不利于腾目科技的行为</li>
              </ul>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">6. 知识产权</h2>
              <p className="text-muted-foreground">
                腾目科技提供的服务中包含的所有内容（包括但不限于文字、图片、音频、视频、图表、标识、版面设计、电子文档等）的知识产权归腾目科技或相关权利人所有。
              </p>
              <p className="text-muted-foreground">
                未经腾目科技或相关权利人事先书面许可，用户不得以任何方式使用、复制、修改、传播或分发上述内容，或在非腾目科技所属的服务器上做镜像。
              </p>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">7. 免责声明</h2>
              <p className="text-muted-foreground">
                腾目科技不对因下述任一情况而导致的任何损害赔偿承担责任，包括但不限于利润、商誉、使用、数据等方面的损失或其他无形损失的损害赔偿：
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 pl-4">
                <li>服务使用或无法使用</li>
                <li>通过服务购买或获取的任何产品、数据、信息或服务</li>
                <li>服务中断或数据丢失</li>
                <li>未经授权的访问或数据变更</li>
                <li>第三方在服务中所作之声明或行为</li>
                <li>其他与服务相关的事宜</li>
              </ul>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">8. 条款修改</h2>
              <p className="text-muted-foreground">
                腾目科技有权在必要时修改本条款，并在修改后通过网站公告、电子邮件或其他方式通知用户。如用户不同意相关变更，应立即停止使用服务；用户继续使用服务，即表示用户接受经修订的条款。
              </p>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">9. 法律适用与争议解决</h2>
              <p className="text-muted-foreground">
                本条款的订立、执行和解释及争议的解决均应适用中华人民共和国法律。如发生腾目科技与用户之间的争议，应首先通过友好协商解决；协商不成的，任何一方均有权将争议提交至腾目科技所在地有管辖权的人民法院解决。
              </p>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">10. 其他规定</h2>
              <p className="text-muted-foreground">
                本条款中的标题仅为方便阅读而设，不影响对条款本身的解释。本条款最终解释权归腾目科技所有。
              </p>
              <p className="text-muted-foreground">
                如本条款中的任何条款因任何原因被视为无效，该条款应在不影响其余条款效力的前提下被视为可分的，且不影响其余条款的有效性及适用性。
              </p>
            </div>
            
            <div className="pt-4 text-center">
              <p className="text-sm text-muted-foreground">更新日期：2023年12月1日</p>
            </div>
          </CardContent>
        </Card>
        
        <div className="text-center mt-8 text-xs text-foreground/50">
          <p>腾目科技网络有限公司 © {new Date().getFullYear()} 版权所有</p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
