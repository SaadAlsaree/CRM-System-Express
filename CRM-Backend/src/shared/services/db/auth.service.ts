import { IAuthDocument, IUpdatePasswordTokenRequest } from '@auth/interfaces/auth.interface';
import { IRoleDocument } from '@auth/interfaces/role.interface';
import { IRankDocument } from '@auth/interfaces/rank.interface';
import { AuthModel } from '@auth/models/auth.schema';
import { RoleModel } from '@auth/models/role.schema';
import { RankModel } from '@auth/models/rank.schema';
import { Helpers } from '@globals/helpers/helpers';

class AuthService {


  //create a new role
  public async createRole(role: IRoleDocument): Promise<void> {
    await RoleModel.create(role);
  }

  // update a role
  public async updateRole(role: IRoleDocument): Promise<void> {
    await RoleModel.updateOne({ _id: role._id }, role);
  }

  // delete a role
  public async deleteRole(roleId: string): Promise<void> {
    await RoleModel.deleteOne({ _id: roleId });
  }

  // get all roles
  public async getRoles(): Promise<IRoleDocument[]> {
    return RoleModel.find();
  }

  // get a role by id
  public async getRoleById(roleId: string): Promise<IRoleDocument | null> {
    const role = RoleModel.findById(roleId);
    return role;
  }

  // create a new rank
  public async createRank(rank: IRankDocument): Promise<void> {
    await RankModel.create(rank);
  }

  // update a rank
  public async updateRank(rank: IRankDocument): Promise<void> {
    await RankModel.updateOne({ _id: rank._id }, rank);
  }

  // delete a rank
  public async deleteRank(rankId: string): Promise<void> {
    await RankModel.deleteOne({ _id: rankId });
  }

  // get all ranks
  public async getRanks(): Promise<IRankDocument[]> {
    return RankModel.find();
  }

  // get a rank by id
  public async getRankById(rankId: string): Promise<IRankDocument | null> {
    return RankModel.findById(rankId);
  }

  // Users service
  // create a new user
  public async createAuth(user: IAuthDocument): Promise<void> {
    await AuthModel.create(user);
  }


  // update password reset token
  public async updatePasswordResetToken(request: IUpdatePasswordTokenRequest): Promise<void> {
    await AuthModel.updateOne({ _id: request._id }, {
      passwordResetToken: request.passwordResetToken,
      passwordResetExpires: request.passwordResetExpires
    });
  }

  //Get user by userLogin
  public async getUserByUserLogin(userLogin: string): Promise<IAuthDocument | null> {
    const user: IAuthDocument = (await AuthModel.findOne({ userLogin: Helpers.lowerCase(userLogin) })) as IAuthDocument;
    return user;
  }

  // get user by password reset token
  public async getUserByPasswordResetToken(token: string): Promise<IAuthDocument | null> {
    const user: IAuthDocument = (await AuthModel.findOne({ passwordResetToken: token, passwordResetExpires: { $gt: Date.now() } })) as IAuthDocument;
    return user;
  }
}


export const authService: AuthService = new AuthService();
